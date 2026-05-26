import type { Response } from "express";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateProfileDto } from "./dto/update-profile.dto";
import { CreateUserAddressDto } from "./dto/create-user-address.dto";
import { UpdateUserAddressDto } from "./dto/update-user-address.dto";
export declare class AuthController {
  private auth;
  constructor(auth: AuthService);
  me(req: Request): Promise<{
    id: number;
    email: string | null;
    phone: string | null;
    firstName: string;
    lastName: string;
    role: import("@prisma/client").$Enums.Role;
  }>;
  create(createUserDto: CreateUserDto): Promise<{
    id: number;
    createdAt: Date;
    email: string | null;
    phone: string | null;
    firstName: string;
    lastName: string;
    role: import("@prisma/client").$Enums.Role;
  }>;
  login(
    dto: LoginDto,
    res: Response,
  ): Promise<{
    user: {
      id: number;
      email: string | null;
      firstName: string;
      lastName: string;
      phone: string | null;
      role: import("@prisma/client").$Enums.Role;
    };
  }>;
  googleAuth(): Promise<null>;
  googleCallback(req: Request, res: Response): Promise<void>;
  yandexAuth(res: Response): Promise<void>;
  yandexCallback(req: Request, res: Response): Promise<void>;
  vkAuth(res: Response): Promise<void>;
  vkCallback(req: Request, res: Response): Promise<void>;
  refresh(
    req: Request,
    res: Response,
  ): Promise<{
    ok: boolean;
  }>;
  logout(
    req: Request,
    res: Response,
  ): Promise<{
    ok: boolean;
  }>;
  updateMe(
    req: Request,
    dto: UpdateProfileDto,
  ): Promise<{
    id: number;
    email: string | null;
    phone: string | null;
    firstName: string;
    lastName: string;
    role: import("@prisma/client").$Enums.Role;
  }>;
  getMyAddresses(req: Request): Promise<any>;
  createMyAddress(req: Request, dto: CreateUserAddressDto): Promise<any>;
  updateMyAddress(
    req: Request,
    addressId: number,
    dto: UpdateUserAddressDto,
  ): Promise<any>;
  deleteMyAddress(
    req: Request,
    addressId: number,
  ): Promise<{
    ok: boolean;
  }>;
}
