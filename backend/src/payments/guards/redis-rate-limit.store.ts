import { Injectable, Logger } from '@nestjs/common';
import { Socket, connect as netConnect } from 'node:net';
import { connect as tlsConnect, TLSSocket } from 'node:tls';

type Bucket = {
  count: number;
  windowStart: number;
};

type RedisConn = {
  host: string;
  port: number;
  username?: string;
  password?: string;
  db: number;
  tls: boolean;
};

type RedisResponse = string | number | null;

@Injectable()
export class RedisRateLimitStore {
  private static readonly memoryBuckets = new Map<string, Bucket>();
  private readonly logger = new Logger(RedisRateLimitStore.name);

  async incrementWithWindow(
    key: string,
    windowMs: number,
  ): Promise<{ count: number; storage: 'redis' | 'memory' }> {
    const redisUrl =
      process.env.YOOKASSA_WEBHOOK_REDIS_URL || process.env.REDIS_URL;

    if (!redisUrl) {
      return {
        count: this.incrementInMemory(key, windowMs),
        storage: 'memory',
      };
    }

    try {
      const count = await this.incrementInRedis(redisUrl, key, windowMs);
      return { count, storage: 'redis' };
    } catch (error) {
      this.logger.warn(
        JSON.stringify({
          event: 'webhook_rate_limit_redis_fallback',
          message: 'Redis unavailable, fallback to in-memory rate limit',
          error: error instanceof Error ? error.message : String(error),
          key,
          at: new Date().toISOString(),
        }),
      );
      return {
        count: this.incrementInMemory(key, windowMs),
        storage: 'memory',
      };
    }
  }

  clearMemoryBucketsForTests() {
    RedisRateLimitStore.memoryBuckets.clear();
  }

  private incrementInMemory(key: string, windowMs: number): number {
    const now = Date.now();
    const current = RedisRateLimitStore.memoryBuckets.get(key);
    if (!current || now - current.windowStart >= windowMs) {
      RedisRateLimitStore.memoryBuckets.set(key, {
        count: 1,
        windowStart: now,
      });
      return 1;
    }
    current.count += 1;
    return current.count;
  }

  private async incrementInRedis(
    redisUrl: string,
    key: string,
    windowMs: number,
  ): Promise<number> {
    const conn = this.parseRedisUrl(redisUrl);
    const socket = await this.openSocket(conn);

    try {
      if (conn.password) {
        if (conn.username) {
          await this.sendCommand(socket, [
            'AUTH',
            conn.username,
            conn.password,
          ]);
        } else {
          await this.sendCommand(socket, ['AUTH', conn.password]);
        }
      }

      if (conn.db > 0) {
        await this.sendCommand(socket, ['SELECT', String(conn.db)]);
      }

      const count = await this.sendCommand(socket, ['INCR', key]);
      if (typeof count !== 'number') {
        throw new Error('Unexpected INCR response');
      }

      const ttl = await this.sendCommand(socket, ['PTTL', key]);
      if (typeof ttl === 'number' && ttl < 0) {
        await this.sendCommand(socket, ['PEXPIRE', key, String(windowMs)]);
      }

      return count;
    } finally {
      socket.end();
      socket.destroy();
    }
  }

  private parseRedisUrl(redisUrl: string): RedisConn {
    const parsed = new URL(redisUrl);
    if (parsed.protocol !== 'redis:' && parsed.protocol !== 'rediss:') {
      throw new Error('Only redis:// or rediss:// URLs are supported');
    }
    const dbFromPath = Number((parsed.pathname || '/0').replace('/', ''));
    return {
      host: parsed.hostname,
      port: Number(parsed.port || 6379),
      username: parsed.username || undefined,
      password: parsed.password || undefined,
      db: Number.isFinite(dbFromPath) ? dbFromPath : 0,
      tls: parsed.protocol === 'rediss:',
    };
  }

  private openSocket(conn: RedisConn): Promise<Socket | TLSSocket> {
    return new Promise((resolve, reject) => {
      const socket = conn.tls
        ? tlsConnect({ host: conn.host, port: conn.port })
        : netConnect({ host: conn.host, port: conn.port });

      const timeout = setTimeout(() => {
        socket.destroy();
        reject(new Error('Redis connection timeout'));
      }, 1_500);

      socket.once('error', (err) => {
        clearTimeout(timeout);
        reject(err);
      });

      socket.once('connect', () => {
        clearTimeout(timeout);
        resolve(socket);
      });
    });
  }

  private sendCommand(
    socket: Socket | TLSSocket,
    parts: string[],
  ): Promise<RedisResponse> {
    const payload = this.toResp(parts);
    return new Promise((resolve, reject) => {
      const onData = (chunk: Buffer) => {
        try {
          const parsed = this.parseResp(chunk);
          cleanup();
          if (parsed instanceof Error) {
            reject(parsed);
            return;
          }
          resolve(parsed);
        } catch (error) {
          cleanup();
          reject(error);
        }
      };

      const onError = (err: Error) => {
        cleanup();
        reject(err);
      };

      const cleanup = () => {
        socket.off('data', onData);
        socket.off('error', onError);
      };

      socket.on('data', onData);
      socket.on('error', onError);
      socket.write(payload);
    });
  }

  private toResp(parts: string[]): string {
    const chunks = [`*${parts.length}\r\n`];
    for (const part of parts) {
      chunks.push(`$${Buffer.byteLength(part)}\r\n${part}\r\n`);
    }
    return chunks.join('');
  }

  private parseResp(chunk: Buffer): RedisResponse | Error {
    const text = chunk.toString('utf8');
    const prefix = text[0];

    if (prefix === '+') {
      return text.slice(1).split('\r\n')[0];
    }
    if (prefix === ':') {
      const raw = text.slice(1).split('\r\n')[0];
      return Number(raw);
    }
    if (prefix === '$') {
      const [lenLine, value] = text.split('\r\n').slice(0, 2);
      const len = Number(lenLine.slice(1));
      if (len < 0) return null;
      return value ?? null;
    }
    if (prefix === '-') {
      return new Error(text.slice(1).split('\r\n')[0] || 'Redis error');
    }

    throw new Error(`Unsupported RESP payload: ${text}`);
  }
}
