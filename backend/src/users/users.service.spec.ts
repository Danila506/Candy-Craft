import { UserService } from './users.service';

describe('UserService safe selects', () => {
  const prisma = {
    user: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
    },
  };

  let service: UserService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new UserService(prisma as any);
  });

  it('uses a safe select without passwordHash when finding a user by id', async () => {
    prisma.user.findUnique.mockResolvedValue({
      id: 1,
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@example.test',
      cart: null,
    });

    await service.findOne(1);

    expect(prisma.user.findUnique).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: 1 },
        select: expect.any(Object),
      }),
    );
    const query = prisma.user.findUnique.mock.calls[0][0];
    expect(query.include).toBeUndefined();
    expect(JSON.stringify(query.select)).not.toContain('passwordHash');
  });

  it('uses a safe select without passwordHash when updating a user', async () => {
    prisma.user.findUnique.mockResolvedValue({
      id: 1,
      email: 'admin@example.test',
    });
    prisma.user.update.mockResolvedValue({
      id: 1,
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@example.test',
      cart: null,
    });

    await service.update(1, { email: 'admin@example.test' });

    expect(prisma.user.update).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: 1 },
        select: expect.any(Object),
      }),
    );
    const query = prisma.user.update.mock.calls[0][0];
    expect(query.include).toBeUndefined();
    expect(JSON.stringify(query.select)).not.toContain('passwordHash');
  });
});
