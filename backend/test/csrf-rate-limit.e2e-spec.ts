import { INestApplication, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types';
import cookieParser from 'cookie-parser';
import { AuthController } from '../src/auth/auth.controller';
import { AuthService } from '../src/auth/auth.service';
import { CsrfOriginGuard } from '../src/security/csrf-origin.guard';
import { RateLimitGuard } from '../src/security/rate-limit.guard';
import { SimpleRateLimitStore } from '../src/security/simple-rate-limit.store';
import { SuggestController } from '../src/suggest/suggest.controller';
import { SuggestService } from '../src/suggest/suggest.service';

const authServiceMock = {
  register: jest.fn().mockResolvedValue({ id: 1 }),
  login: jest.fn().mockResolvedValue({
    accessToken: 'access-token',
    refreshToken: 'refresh-token',
    user: { id: 1, email: 'user@example.test' },
  }),
  refresh: jest.fn().mockResolvedValue({
    accessToken: 'next-access-token',
    refreshToken: 'next-refresh-token',
  }),
  logout: jest.fn().mockResolvedValue(undefined),
  me: jest.fn(),
  updateMe: jest.fn(),
  listMyAddresses: jest.fn(),
  createMyAddress: jest.fn(),
  updateMyAddress: jest.fn(),
  deleteMyAddress: jest.fn(),
};

const suggestServiceMock = {
  suggestAddress: jest.fn().mockResolvedValue({ suggestions: [] }),
};

@Module({
  controllers: [AuthController, SuggestController],
  providers: [
    RateLimitGuard,
    SimpleRateLimitStore,
    { provide: APP_GUARD, useClass: CsrfOriginGuard },
    { provide: AuthService, useValue: authServiceMock },
    { provide: SuggestService, useValue: suggestServiceMock },
  ],
})
class TestSecurityControlsModule {}

describe('CSRF and rate limits (e2e)', () => {
  let app: INestApplication<App>;
  let rateLimitStore: SimpleRateLimitStore;

  beforeAll(async () => {
    process.env.FRONTEND_URL = 'https://shop.example.test';
    process.env.AUTH_LOGIN_RATE_LIMIT_MAX = '2';
    process.env.AUTH_LOGIN_RATE_LIMIT_WINDOW_MS = '60000';
    process.env.AUTH_REGISTER_RATE_LIMIT_MAX = '2';
    process.env.AUTH_REGISTER_RATE_LIMIT_WINDOW_MS = '60000';
    process.env.AUTH_REFRESH_RATE_LIMIT_MAX = '2';
    process.env.AUTH_REFRESH_RATE_LIMIT_WINDOW_MS = '60000';
    process.env.SUGGEST_ADDRESS_RATE_LIMIT_MAX = '2';
    process.env.SUGGEST_ADDRESS_RATE_LIMIT_WINDOW_MS = '60000';

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TestSecurityControlsModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.use(cookieParser());
    await app.init();
    rateLimitStore = app.get(SimpleRateLimitStore);
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    rateLimitStore.clearForTests();
  });

  it('rejects unsafe auth requests without a trusted Origin', async () => {
    await request(app.getHttpServer())
      .post('/auth/logout')
      .set('Cookie', 'refresh_token=abc')
      .expect(403);

    expect(authServiceMock.logout).not.toHaveBeenCalled();
  });

  it('allows unsafe auth requests from the configured frontend origin', async () => {
    await request(app.getHttpServer())
      .post('/auth/logout')
      .set('Origin', 'https://shop.example.test')
      .set('Cookie', 'refresh_token=abc')
      .expect(201)
      .expect({ ok: true });

    expect(authServiceMock.logout).toHaveBeenCalledWith('abc');
  });

  it('rate limits auth login attempts', async () => {
    const payload = { email: 'limited@example.test', password: 'password' };

    await request(app.getHttpServer())
      .post('/auth/login')
      .set('Origin', 'https://shop.example.test')
      .send(payload)
      .expect(201);
    await request(app.getHttpServer())
      .post('/auth/login')
      .set('Origin', 'https://shop.example.test')
      .send(payload)
      .expect(201);
    await request(app.getHttpServer())
      .post('/auth/login')
      .set('Origin', 'https://shop.example.test')
      .send(payload)
      .expect(429);
  });

  it('rate limits auth register attempts', async () => {
    const payload = {
      firstName: 'Rate',
      lastName: 'Limited',
      email: 'register@example.test',
      password: 'password',
    };

    await request(app.getHttpServer())
      .post('/auth/register')
      .set('Origin', 'https://shop.example.test')
      .send(payload)
      .expect(201);
    await request(app.getHttpServer())
      .post('/auth/register')
      .set('Origin', 'https://shop.example.test')
      .send(payload)
      .expect(201);
    await request(app.getHttpServer())
      .post('/auth/register')
      .set('Origin', 'https://shop.example.test')
      .send(payload)
      .expect(429);
  });

  it('rate limits auth refresh attempts', async () => {
    await request(app.getHttpServer())
      .post('/auth/refresh')
      .set('Origin', 'https://shop.example.test')
      .set('Cookie', 'refresh_token=abc')
      .expect(201);
    await request(app.getHttpServer())
      .post('/auth/refresh')
      .set('Origin', 'https://shop.example.test')
      .set('Cookie', 'refresh_token=abc')
      .expect(201);
    await request(app.getHttpServer())
      .post('/auth/refresh')
      .set('Origin', 'https://shop.example.test')
      .set('Cookie', 'refresh_token=abc')
      .expect(429);
  });

  it('rate limits suggest/address requests', async () => {
    const payload = { query: 'Vladivostok', count: 5 };

    await request(app.getHttpServer())
      .post('/suggest/address')
      .send(payload)
      .expect(201);
    await request(app.getHttpServer())
      .post('/suggest/address')
      .send(payload)
      .expect(201);
    await request(app.getHttpServer())
      .post('/suggest/address')
      .send(payload)
      .expect(429);
  });
});
