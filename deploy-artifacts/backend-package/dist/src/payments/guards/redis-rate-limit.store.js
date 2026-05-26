"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
            ? (desc = Object.getOwnPropertyDescriptor(target, key))
            : desc,
      d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return (c > 3 && r && Object.defineProperty(target, key, r), r);
  };
var RedisRateLimitStore_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisRateLimitStore = void 0;
const common_1 = require("@nestjs/common");
const node_net_1 = require("node:net");
const node_tls_1 = require("node:tls");
let RedisRateLimitStore = class RedisRateLimitStore {
  static {
    RedisRateLimitStore_1 = this;
  }
  static memoryBuckets = new Map();
  logger = new common_1.Logger(RedisRateLimitStore_1.name);
  async incrementWithWindow(key, windowMs) {
    const redisUrl =
      process.env.YOOKASSA_WEBHOOK_REDIS_URL || process.env.REDIS_URL;
    if (!redisUrl) {
      return {
        count: this.incrementInMemory(key, windowMs),
        storage: "memory",
      };
    }
    try {
      const count = await this.incrementInRedis(redisUrl, key, windowMs);
      return { count, storage: "redis" };
    } catch (error) {
      this.logger.warn(
        JSON.stringify({
          event: "webhook_rate_limit_redis_fallback",
          message: "Redis unavailable, fallback to in-memory rate limit",
          error: error instanceof Error ? error.message : String(error),
          key,
          at: new Date().toISOString(),
        }),
      );
      return {
        count: this.incrementInMemory(key, windowMs),
        storage: "memory",
      };
    }
  }
  clearMemoryBucketsForTests() {
    RedisRateLimitStore_1.memoryBuckets.clear();
  }
  incrementInMemory(key, windowMs) {
    const now = Date.now();
    const current = RedisRateLimitStore_1.memoryBuckets.get(key);
    if (!current || now - current.windowStart >= windowMs) {
      RedisRateLimitStore_1.memoryBuckets.set(key, {
        count: 1,
        windowStart: now,
      });
      return 1;
    }
    current.count += 1;
    return current.count;
  }
  async incrementInRedis(redisUrl, key, windowMs) {
    const conn = this.parseRedisUrl(redisUrl);
    const socket = await this.openSocket(conn);
    try {
      if (conn.password) {
        if (conn.username) {
          await this.sendCommand(socket, [
            "AUTH",
            conn.username,
            conn.password,
          ]);
        } else {
          await this.sendCommand(socket, ["AUTH", conn.password]);
        }
      }
      if (conn.db > 0) {
        await this.sendCommand(socket, ["SELECT", String(conn.db)]);
      }
      const count = await this.sendCommand(socket, ["INCR", key]);
      if (typeof count !== "number") {
        throw new Error("Unexpected INCR response");
      }
      const ttl = await this.sendCommand(socket, ["PTTL", key]);
      if (typeof ttl === "number" && ttl < 0) {
        await this.sendCommand(socket, ["PEXPIRE", key, String(windowMs)]);
      }
      return count;
    } finally {
      socket.end();
      socket.destroy();
    }
  }
  parseRedisUrl(redisUrl) {
    const parsed = new URL(redisUrl);
    if (parsed.protocol !== "redis:" && parsed.protocol !== "rediss:") {
      throw new Error("Only redis:// or rediss:// URLs are supported");
    }
    const dbFromPath = Number((parsed.pathname || "/0").replace("/", ""));
    return {
      host: parsed.hostname,
      port: Number(parsed.port || 6379),
      username: parsed.username || undefined,
      password: parsed.password || undefined,
      db: Number.isFinite(dbFromPath) ? dbFromPath : 0,
      tls: parsed.protocol === "rediss:",
    };
  }
  openSocket(conn) {
    return new Promise((resolve, reject) => {
      const socket = conn.tls
        ? (0, node_tls_1.connect)({ host: conn.host, port: conn.port })
        : (0, node_net_1.connect)({ host: conn.host, port: conn.port });
      const timeout = setTimeout(() => {
        socket.destroy();
        reject(new Error("Redis connection timeout"));
      }, 1_500);
      socket.once("error", (err) => {
        clearTimeout(timeout);
        reject(err);
      });
      socket.once("connect", () => {
        clearTimeout(timeout);
        resolve(socket);
      });
    });
  }
  sendCommand(socket, parts) {
    const payload = this.toResp(parts);
    return new Promise((resolve, reject) => {
      const onData = (chunk) => {
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
      const onError = (err) => {
        cleanup();
        reject(err);
      };
      const cleanup = () => {
        socket.off("data", onData);
        socket.off("error", onError);
      };
      socket.on("data", onData);
      socket.on("error", onError);
      socket.write(payload);
    });
  }
  toResp(parts) {
    const chunks = [`*${parts.length}\r\n`];
    for (const part of parts) {
      chunks.push(`$${Buffer.byteLength(part)}\r\n${part}\r\n`);
    }
    return chunks.join("");
  }
  parseResp(chunk) {
    const text = chunk.toString("utf8");
    const prefix = text[0];
    if (prefix === "+") {
      return text.slice(1).split("\r\n")[0];
    }
    if (prefix === ":") {
      const raw = text.slice(1).split("\r\n")[0];
      return Number(raw);
    }
    if (prefix === "$") {
      const [lenLine, value] = text.split("\r\n").slice(0, 2);
      const len = Number(lenLine.slice(1));
      if (len < 0) return null;
      return value ?? null;
    }
    if (prefix === "-") {
      return new Error(text.slice(1).split("\r\n")[0] || "Redis error");
    }
    throw new Error(`Unsupported RESP payload: ${text}`);
  }
};
exports.RedisRateLimitStore = RedisRateLimitStore;
exports.RedisRateLimitStore =
  RedisRateLimitStore =
  RedisRateLimitStore_1 =
    __decorate([(0, common_1.Injectable)()], RedisRateLimitStore);
//# sourceMappingURL=redis-rate-limit.store.js.map
