import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeAll(() => {
    process.env.JWT_ACCESS_SECRET ??= 'test-access-secret';
    process.env.JWT_REFRESH_SECRET ??= 'test-refresh-secret';
    process.env.GOOGLE_CLIENT_ID ??= 'test-google-client-id';
    process.env.GOOGLE_CLIENT_SECRET ??= 'test-google-client-secret';
    process.env.GOOGLE_CALLBACK_URL ??=
      'http://localhost:3000/auth/google/callback';
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app?.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});
