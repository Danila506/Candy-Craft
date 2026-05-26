import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateProfileDto } from "./dto/update-profile.dto";
import { CreateUserAddressDto } from "./dto/create-user-address.dto";
import { UpdateUserAddressDto } from "./dto/update-user-address.dto";
export declare class AuthService {
  private prisma;
  private jwt;
  constructor(prisma: PrismaService, jwt: JwtService);
  private accessSecret;
  private refreshSecret;
  private accessExp;
  private refreshExp;
  private readonly socialUserSelect;
  register(dto: CreateUserDto): Promise<{
    id: number;
    createdAt: Date;
    email: string | null;
    phone: string | null;
    firstName: string;
    lastName: string;
    role: import("@prisma/client").$Enums.Role;
  }>;
  login(
    email: string,
    password: string,
  ): Promise<{
    accessToken: string;
    refreshToken: string;
    user: {
      id: number;
      email: string | null;
      firstName: string;
      lastName: string;
      phone: string | null;
      role: import("@prisma/client").$Enums.Role;
    };
  }>;
  googleLogin(profile: {
    email: string | null;
    firstName: string;
    lastName: string;
    googleId: string;
  }): Promise<{
    accessToken: string;
    refreshToken: string;
    user: {
      id: number;
      email: string | null;
      firstName: string;
      lastName: string;
      phone: string | null;
      role: import("@prisma/client").$Enums.Role;
    };
  }>;
  yandexLogin(code: string): Promise<{
    accessToken: string;
    refreshToken: string;
    user: {
      id: number;
      email: string | null;
      firstName: string;
      lastName: string;
      phone: string | null;
      role: import("@prisma/client").$Enums.Role;
    };
  }>;
  vkLogin(params: {
    code: string;
    deviceId: string;
    codeVerifier: string;
    state: string;
  }): Promise<{
    accessToken: string;
    refreshToken: string;
    user: {
      id: number;
      email: string | null;
      firstName: string;
      lastName: string;
      phone: string | null;
      role: import("@prisma/client").$Enums.Role;
    };
  }>;
  private socialLogin;
  refresh(refreshToken: string): Promise<{
    accessToken: string;
    refreshToken: string;
  }>;
  private findMatchingToken;
  private issueTokens;
  private issueAuthSession;
  logout(refreshToken: string): Promise<void>;
  me(userId: number): Promise<{
    id: number;
    email: string | null;
    phone: string | null;
    firstName: string;
    lastName: string;
    role: import("@prisma/client").$Enums.Role;
  }>;
  updateMe(
    userId: number,
    dto: UpdateProfileDto,
  ): Promise<{
    id: number;
    email: string | null;
    phone: string | null;
    firstName: string;
    lastName: string;
    role: import("@prisma/client").$Enums.Role;
  }>;
  listMyAddresses(userId: number): Promise<any>;
  createMyAddress(userId: number, dto: CreateUserAddressDto): Promise<any>;
  updateMyAddress(
    userId: number,
    addressId: number,
    dto: UpdateUserAddressDto,
  ): Promise<any>;
  deleteMyAddress(
    userId: number,
    addressId: number,
  ): Promise<{
    ok: boolean;
  }>;
  private ensureUserExists;
}
