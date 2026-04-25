import {
  CanActivate,
  ExecutionContext,
  INestApplication,
  Module,
  UnauthorizedException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import type { Role } from '@prisma/client';
import request from 'supertest';
import { App } from 'supertest/types';
import { ROLES_KEY } from '../src/auth/decorators/roles.decorator';
import { RolesGuard } from '../src/auth/guards/roles.guard';
import { JwtAuthGuard } from '../src/auth/jwt-auth.guard';
import { OrdersController } from '../src/orders/orders.controller';
import { OrderOptionsService } from '../src/orders/order-options.service';
import { OrdersService } from '../src/orders/orders.service';
import { UsersController } from '../src/users/users.controller';
import { UserService } from '../src/users/users.service';

class TestJwtGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const userIdHeader = req.headers['x-user-id'];
    const roleHeader = req.headers['x-user-role'];

    if (!userIdHeader) {
      throw new UnauthorizedException('Unauthorized');
    }

    const userId = Number(userIdHeader);
    if (!Number.isFinite(userId)) {
      throw new UnauthorizedException('Unauthorized');
    }

    req.user = {
      userId,
      role: (roleHeader as Role | undefined) ?? 'USER',
    };
    return true;
  }
}

class TestRolesGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const handlerRoles =
      (Reflect.getMetadata(ROLES_KEY, context.getHandler()) as Role[]) ?? [];
    const classRoles =
      (Reflect.getMetadata(ROLES_KEY, context.getClass()) as Role[]) ?? [];
    const roles = handlerRoles.length ? handlerRoles : classRoles;

    if (!roles?.length) return true;

    const request = context.switchToHttp().getRequest();
    const role = request?.user?.role as Role | undefined;
    return !!role && roles.includes(role);
  }
}

const usersServiceMock = {
  findAll: jest.fn().mockResolvedValue([]),
  findOne: jest.fn(),
  findByEmail: jest.fn(),
  getUserStats: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

const ordersServiceMock = {
  create: jest.fn(),
  findAll: jest.fn().mockResolvedValue([]),
  findOrders: jest.fn().mockResolvedValue([]),
  getStatusHistory: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

const orderOptionsServiceMock = {
  getPublicOptions: jest.fn().mockReturnValue({ delivery: [], gifts: [] }),
};

@Module({
  controllers: [UsersController, OrdersController],
  providers: [
    { provide: UserService, useValue: usersServiceMock },
    { provide: OrdersService, useValue: ordersServiceMock },
    { provide: OrderOptionsService, useValue: orderOptionsServiceMock },
  ],
})
class TestSecurityModule {}

describe('Security (e2e)', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TestSecurityModule],
    })
      .overrideGuard(JwtAuthGuard)
      .useClass(TestJwtGuard)
      .overrideGuard(RolesGuard)
      .useClass(TestRolesGuard)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    usersServiceMock.findAll.mockResolvedValue([]);
    ordersServiceMock.findOrders.mockResolvedValue([]);
  });

  it('GET /users should return 401 for unauthenticated user', async () => {
    await request(app.getHttpServer()).get('/users').expect(401);
  });

  it('GET /users should return 403 for authenticated non-admin', async () => {
    await request(app.getHttpServer())
      .get('/users')
      .set('x-user-id', '10')
      .set('x-user-role', 'USER')
      .expect(403);
  });

  it('GET /users should return 200 for admin', async () => {
    await request(app.getHttpServer())
      .get('/users')
      .set('x-user-id', '1')
      .set('x-user-role', 'ADMIN')
      .expect(200);

    expect(usersServiceMock.findAll).toHaveBeenCalled();
  });

  it('GET /orders/me should return 401 for unauthenticated user', async () => {
    await request(app.getHttpServer()).get('/orders/me').expect(401);
  });

  it('GET /orders/me should return 200 and fetch current user orders', async () => {
    await request(app.getHttpServer())
      .get('/orders/me')
      .set('x-user-id', '42')
      .set('x-user-role', 'USER')
      .expect(200);

    expect(ordersServiceMock.findOrders).toHaveBeenCalledWith(42);
  });

  it('GET /orders/:id should return 403 for чужой id when role USER', async () => {
    await request(app.getHttpServer())
      .get('/orders/43')
      .set('x-user-id', '42')
      .set('x-user-role', 'USER')
      .expect(403);
  });

  it('GET /orders/:id should return 200 for same user id', async () => {
    await request(app.getHttpServer())
      .get('/orders/42')
      .set('x-user-id', '42')
      .set('x-user-role', 'USER')
      .expect(200);

    expect(ordersServiceMock.findOrders).toHaveBeenCalledWith(42);
  });
});
