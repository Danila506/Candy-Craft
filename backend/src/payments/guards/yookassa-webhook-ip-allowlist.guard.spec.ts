import { ExecutionContext, ForbiddenException } from '@nestjs/common';
import { YooKassaWebhookIpAllowlistGuard } from './yookassa-webhook-ip-allowlist.guard';

function contextForRequest(req: Record<string, any>) {
  return {
    switchToHttp: () => ({
      getRequest: () => req,
    }),
  } as ExecutionContext;
}

describe('YooKassaWebhookIpAllowlistGuard', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
    delete process.env.YOOKASSA_WEBHOOK_ALLOWED_IPS;
    delete process.env.YOOKASSA_WEBHOOK_TRUSTED_PROXY_IPS;
    delete process.env.NODE_ENV;
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('fails closed in production when allowlist is not configured', () => {
    process.env.NODE_ENV = 'production';
    const guard = new YooKassaWebhookIpAllowlistGuard();

    expect(() =>
      guard.canActivate(
        contextForRequest({
          headers: {},
          ip: '203.0.113.10',
          socket: { remoteAddress: '203.0.113.10' },
        }),
      ),
    ).toThrow(ForbiddenException);
  });

  it('ignores spoofed x-forwarded-for from untrusted direct sources', () => {
    process.env.YOOKASSA_WEBHOOK_ALLOWED_IPS = '203.0.113.10';
    const guard = new YooKassaWebhookIpAllowlistGuard();

    expect(() =>
      guard.canActivate(
        contextForRequest({
          headers: { 'x-forwarded-for': '203.0.113.10' },
          ip: '198.51.100.20',
          socket: { remoteAddress: '198.51.100.20' },
        }),
      ),
    ).toThrow(ForbiddenException);
  });

  it('uses x-forwarded-for from trusted proxy sources', () => {
    process.env.YOOKASSA_WEBHOOK_ALLOWED_IPS = '203.0.113.10';
    process.env.YOOKASSA_WEBHOOK_TRUSTED_PROXY_IPS = '198.51.100.20';
    const guard = new YooKassaWebhookIpAllowlistGuard();

    expect(
      guard.canActivate(
        contextForRequest({
          headers: { 'x-forwarded-for': '203.0.113.10' },
          ip: '198.51.100.20',
          socket: { remoteAddress: '198.51.100.20' },
        }),
      ),
    ).toBe(true);
  });
});
