import { GUARDS_METADATA } from '@nestjs/common/constants';
import { Role } from '@prisma/client';
import { ROLES_KEY } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UsersController } from './users.controller';

describe('UsersController security metadata', () => {
  it('should require JwtAuthGuard and RolesGuard on controller', () => {
    const guards = Reflect.getMetadata(GUARDS_METADATA, UsersController) as
      | Array<new (...args: any[]) => any>
      | undefined;

    expect(guards).toBeDefined();
    expect(guards).toContain(JwtAuthGuard);
    expect(guards).toContain(RolesGuard);
  });

  it('should require ADMIN role on controller', () => {
    const roles = Reflect.getMetadata(ROLES_KEY, UsersController) as
      | Role[]
      | undefined;

    expect(roles).toEqual([Role.ADMIN]);
  });
});
