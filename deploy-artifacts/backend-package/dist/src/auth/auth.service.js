"use strict";
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (
          !desc ||
          ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)
        ) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }
    : function (o, v) {
        o["default"] = v;
      });
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
var __importStar =
  (this && this.__importStar) ||
  (function () {
    var ownKeys = function (o) {
      ownKeys =
        Object.getOwnPropertyNames ||
        function (o) {
          var ar = [];
          for (var k in o)
            if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
          return ar;
        };
      return ownKeys(o);
    };
    return function (mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null)
        for (var k = ownKeys(mod), i = 0; i < k.length; i++)
          if (k[i] !== "default") __createBinding(result, mod, k[i]);
      __setModuleDefault(result, mod);
      return result;
    };
  })();
var __metadata =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const argon2 = __importStar(require("argon2"));
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
const phone_1 = require("../utils/phone");
const crypto_1 = require("crypto");
function msFromExpires(expires) {
  const m = expires.match(/^(\d+)([smhd])$/);
  if (!m) throw new Error("Bad expires format");
  const n = Number(m[1]);
  const unit = m[2];
  const mult =
    unit === "s"
      ? 1000
      : unit === "m"
        ? 60_000
        : unit === "h"
          ? 3_600_000
          : 86_400_000;
  return n * mult;
}
function cleanText(value) {
  const v = value?.trim();
  return v ? v : null;
}
function buildAddressLine(dto) {
  const parts = [
    cleanText(dto.city),
    cleanText(dto.street),
    cleanText(dto.house) ? `д. ${cleanText(dto.house)}` : null,
    cleanText(dto.apartment) ? `кв. ${cleanText(dto.apartment)}` : null,
    cleanText(dto.entrance) ? `подъезд ${cleanText(dto.entrance)}` : null,
    cleanText(dto.floor) ? `этаж ${cleanText(dto.floor)}` : null,
  ].filter(Boolean);
  return parts.length ? parts.join(", ") : null;
}
function requiredEnv(name) {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new common_1.BadRequestException(
      `Не настроена переменная окружения ${name}`,
    );
  }
  return value;
}
async function readOAuthJson(url, init) {
  const response = await fetch(url, init);
  const data = await response.json().catch(() => null);
  if (!response.ok || data?.error) {
    throw new common_1.BadRequestException(
      data?.error_description ||
        data?.error ||
        "Не удалось получить данные OAuth-провайдера",
    );
  }
  return data;
}
let AuthService = class AuthService {
  prisma;
  jwt;
  constructor(prisma, jwt) {
    this.prisma = prisma;
    this.jwt = jwt;
  }
  accessSecret = process.env.JWT_ACCESS_SECRET;
  refreshSecret = process.env.JWT_REFRESH_SECRET;
  accessExp = process.env.JWT_ACCESS_EXPIRES_IN || "15m";
  refreshExp = process.env.JWT_REFRESH_EXPIRES_IN || "30d";
  socialUserSelect = {
    id: true,
    email: true,
    firstName: true,
    lastName: true,
    phone: true,
    role: true,
    googleId: true,
    yandexId: true,
    vkId: true,
  };
  async register(dto) {
    if (dto.password !== dto.confirmPassword) {
      throw new common_1.BadRequestException("Пароли не совпадают");
    }
    const email = dto.email.trim().toLowerCase();
    const phone = (0, phone_1.normalizeRuPhone)(dto.phone);
    if (dto.phone?.trim() && !phone) {
      throw new common_1.BadRequestException("Некорректный номер телефона");
    }
    const passwordHash = await argon2.hash(dto.password);
    try {
      const user = await this.prisma.user.create({
        data: {
          firstName: dto.firstName.trim(),
          lastName: dto.lastName.trim(),
          email,
          phone: phone ?? null,
          passwordHash,
        },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
          createdAt: true,
          role: true,
        },
      });
      return user;
    } catch (e) {
      if (
        e instanceof client_1.Prisma.PrismaClientKnownRequestError &&
        e.code === "P2002"
      ) {
        const target = e.meta?.target ?? [];
        if (target.includes("email"))
          throw new common_1.ConflictException("Email уже используется");
        if (target.includes("phone"))
          throw new common_1.ConflictException("Телефон уже используется");
        throw new common_1.ConflictException("Пользователь уже существует");
      }
      throw e;
    }
  }
  async login(email, password) {
    const user = await this.prisma.user.findUnique({
      where: { email: email.trim().toLowerCase() },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        passwordHash: true,
        role: true,
      },
    });
    if (!user)
      throw new common_1.UnauthorizedException("Неверный email или пароль");
    const ok = await argon2.verify(user.passwordHash, password);
    if (!ok)
      throw new common_1.UnauthorizedException("Неверный email или пароль");
    const { accessToken, refreshToken, refreshTokenHash, refreshExpiresAt } =
      await this.issueTokens(user.id, user.email, user.role);
    await this.prisma.refreshToken.create({
      data: {
        userId: user.id,
        tokenHash: refreshTokenHash,
        expiresAt: refreshExpiresAt,
      },
    });
    const safeUser = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      role: user.role,
    };
    return { accessToken, refreshToken, user: safeUser };
  }
  async googleLogin(profile) {
    return this.socialLogin({
      provider: "google",
      providerId: profile.googleId,
      email: profile.email,
      firstName: profile.firstName,
      lastName: profile.lastName,
    });
  }
  async yandexLogin(code) {
    const callbackUrl = requiredEnv("YANDEX_CALLBACK_URL");
    const tokenBody = new URLSearchParams({
      grant_type: "authorization_code",
      code,
      client_id: requiredEnv("YANDEX_CLIENT_ID"),
      client_secret: requiredEnv("YANDEX_CLIENT_SECRET"),
      redirect_uri: callbackUrl,
    });
    const token = await readOAuthJson("https://oauth.yandex.ru/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: tokenBody,
    });
    const profileUrl = new URL("https://login.yandex.ru/info");
    profileUrl.searchParams.set("format", "json");
    profileUrl.searchParams.set("oauth_token", token.access_token);
    const profile = await readOAuthJson(profileUrl.toString());
    const [fallbackFirstName, ...fallbackLastName] = (
      profile.real_name ||
      profile.login ||
      "Yandex User"
    ).split(" ");
    return this.socialLogin({
      provider: "yandex",
      providerId: profile.id,
      email: profile.default_email ?? null,
      firstName: profile.first_name || fallbackFirstName || "Yandex",
      lastName: profile.last_name || fallbackLastName.join(" ") || "User",
    });
  }
  async vkLogin(params) {
    const vkIdBaseUrl = process.env.VK_ID_BASE_URL || "https://id.vk.com";
    const tokenBody = new URLSearchParams({
      grant_type: "authorization_code",
      code: params.code,
      code_verifier: params.codeVerifier,
      client_id: requiredEnv("VK_CLIENT_ID"),
      device_id: params.deviceId,
      redirect_uri: requiredEnv("VK_CALLBACK_URL"),
      state: params.state,
    });
    const token = await readOAuthJson(`${vkIdBaseUrl}/oauth2/auth`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: tokenBody,
    });
    const profileBody = new URLSearchParams({
      client_id: requiredEnv("VK_CLIENT_ID"),
      access_token: token.access_token,
    });
    const profileResponse = await readOAuthJson(
      `${vkIdBaseUrl}/oauth2/user_info`,
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: profileBody,
      },
    );
    const profile = profileResponse.user;
    if (!profile || (!profile.user_id && !profile.id && !token.user_id)) {
      throw new common_1.BadRequestException("Не удалось получить профиль VK");
    }
    return this.socialLogin({
      provider: "vk",
      providerId: String(profile.user_id ?? profile.id ?? token.user_id),
      email: profile.email ?? token.email ?? null,
      firstName: profile.first_name || "VK",
      lastName: profile.last_name || "User",
    });
  }
  async socialLogin(profile) {
    const providerIdField = {
      google: "googleId",
      yandex: "yandexId",
      vk: "vkId",
    };
    const providerIdKey = providerIdField[profile.provider];
    let user = await this.prisma.user.findUnique({
      where: { [providerIdKey]: profile.providerId },
      select: this.socialUserSelect,
    });
    if (user) {
      return this.issueAuthSession(user);
    }
    if (!profile.email && profile.provider !== "vk") {
      throw new common_1.BadRequestException(
        `Не удалось получить email от ${profile.provider.toUpperCase()}`,
      );
    }
    if (!user) {
      const email = profile.email?.trim().toLowerCase() ?? null;
      const byEmail = email
        ? await this.prisma.user.findUnique({
            where: { email },
            select: this.socialUserSelect,
          })
        : null;
      if (byEmail) {
        if (byEmail[providerIdKey] !== profile.providerId) {
          await this.prisma.user.update({
            where: { id: byEmail.id },
            data: { [providerIdKey]: profile.providerId },
          });
        }
        user = { ...byEmail, [providerIdKey]: profile.providerId };
      } else {
        const passwordHash = await argon2.hash(
          (0, crypto_1.randomBytes)(32).toString("hex"),
        );
        user = await this.prisma.user.create({
          data: {
            firstName: profile.firstName || profile.provider,
            lastName: profile.lastName || "User",
            email,
            phone: null,
            passwordHash,
            [providerIdKey]: profile.providerId,
          },
          select: this.socialUserSelect,
        });
      }
    }
    return this.issueAuthSession(user);
  }
  async refresh(refreshToken) {
    let payload;
    try {
      payload = await this.jwt.verifyAsync(refreshToken, {
        secret: this.refreshSecret,
      });
    } catch {
      throw new common_1.UnauthorizedException("Invalid refresh token");
    }
    const userId = payload.sub;
    const refreshTokenHash = await argon2.hash(refreshToken);
    const tokens = await this.prisma.refreshToken.findMany({
      where: {
        userId,
        revokedAt: null,
        expiresAt: { gt: new Date() },
      },
      select: { id: true, tokenHash: true },
    });
    const match = await this.findMatchingToken(tokens, refreshToken);
    if (!match)
      throw new common_1.UnauthorizedException("Invalid refresh token");
    await this.prisma.refreshToken.update({
      where: { id: match.id },
      data: { revokedAt: new Date() },
    });
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { email: true, role: true },
    });
    if (!user)
      throw new common_1.UnauthorizedException("Invalid refresh token");
    const issued = await this.issueTokens(userId, user.email, user.role);
    await this.prisma.refreshToken.create({
      data: {
        userId,
        tokenHash: issued.refreshTokenHash,
        expiresAt: issued.refreshExpiresAt,
      },
    });
    return {
      accessToken: issued.accessToken,
      refreshToken: issued.refreshToken,
    };
  }
  async findMatchingToken(tokens, refreshToken) {
    for (const t of tokens) {
      const ok = await argon2
        .verify(t.tokenHash, refreshToken)
        .catch(() => false);
      if (ok) return { id: t.id };
    }
    return null;
  }
  async issueTokens(userId, email, role) {
    const accessToken = await this.jwt.signAsync(
      { sub: userId, email, role },
      { secret: this.accessSecret, expiresIn: this.accessExp },
    );
    const refreshToken = await this.jwt.signAsync(
      { sub: userId, email, role },
      { secret: this.refreshSecret, expiresIn: this.refreshExp },
    );
    const refreshTokenHash = await argon2.hash(refreshToken);
    const refreshExpiresAt = new Date(
      Date.now() + msFromExpires(this.refreshExp),
    );
    return { accessToken, refreshToken, refreshTokenHash, refreshExpiresAt };
  }
  async issueAuthSession(user) {
    const { accessToken, refreshToken, refreshTokenHash, refreshExpiresAt } =
      await this.issueTokens(user.id, user.email, user.role);
    await this.prisma.refreshToken.create({
      data: {
        userId: user.id,
        tokenHash: refreshTokenHash,
        expiresAt: refreshExpiresAt,
      },
    });
    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        role: user.role,
      },
    };
  }
  async logout(refreshToken) {
    try {
      const payload = await this.jwt.verifyAsync(refreshToken, {
        secret: this.refreshSecret,
      });
      const userId = payload.sub;
      const tokens = await this.prisma.refreshToken.findMany({
        where: { userId, revokedAt: null },
        select: { id: true, tokenHash: true },
      });
      const match = await this.findMatchingToken(tokens, refreshToken);
      if (match) {
        await this.prisma.refreshToken.update({
          where: { id: match.id },
          data: { revokedAt: new Date() },
        });
      }
    } catch {}
  }
  async me(userId) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        role: true,
      },
    });
    if (!user) throw new common_1.UnauthorizedException("User not found");
    return user;
  }
  async updateMe(userId, dto) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true },
    });
    if (!user) throw new common_1.UnauthorizedException("User not found");
    const firstName = dto.firstName?.trim();
    const lastName = dto.lastName?.trim();
    const emailRaw = dto.email?.trim();
    const email = emailRaw ? emailRaw.toLowerCase() : undefined;
    const phoneRaw = dto.phone?.trim();
    const phone = phoneRaw ? (0, phone_1.normalizeRuPhone)(phoneRaw) : null;
    if (dto.phone !== undefined && phoneRaw && !phone) {
      throw new common_1.BadRequestException("Некорректный номер телефона");
    }
    if (email && email !== user.email) {
      const exists = await this.prisma.user.findUnique({ where: { email } });
      if (exists) {
        throw new common_1.ConflictException("Email уже используется");
      }
    }
    try {
      return await this.prisma.user.update({
        where: { id: userId },
        data: {
          ...(firstName !== undefined ? { firstName } : {}),
          ...(lastName !== undefined ? { lastName } : {}),
          ...(email !== undefined ? { email } : {}),
          ...(dto.phone !== undefined ? { phone } : {}),
        },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          phone: true,
          role: true,
        },
      });
    } catch (e) {
      if (
        e instanceof client_1.Prisma.PrismaClientKnownRequestError &&
        e.code === "P2002"
      ) {
        throw new common_1.ConflictException(
          "Email или телефон уже используются",
        );
      }
      throw e;
    }
  }
  async listMyAddresses(userId) {
    await this.ensureUserExists(userId);
    return this.prisma.userAddress.findMany({
      where: { userId },
      orderBy: [{ isDefault: "desc" }, { createdAt: "desc" }],
    });
  }
  async createMyAddress(userId, dto) {
    await this.ensureUserExists(userId);
    const recipientPhoneRaw = cleanText(dto.recipientPhone ?? undefined);
    const recipientPhone = recipientPhoneRaw
      ? (0, phone_1.normalizeRuPhone)(recipientPhoneRaw)
      : null;
    if (recipientPhoneRaw && !recipientPhone) {
      throw new common_1.BadRequestException("Некорректный телефон получателя");
    }
    const fullAddress =
      cleanText(dto.fullAddress ?? undefined) ?? buildAddressLine(dto);
    if (!fullAddress) {
      throw new common_1.BadRequestException("Адрес обязателен");
    }
    return this.prisma.$transaction(async (tx) => {
      if (dto.isDefault) {
        await tx.userAddress.updateMany({
          where: { userId },
          data: { isDefault: false },
        });
      }
      return tx.userAddress.create({
        data: {
          userId,
          label: cleanText(dto.label ?? undefined),
          country: cleanText(dto.country ?? undefined) ?? "Россия",
          city: cleanText(dto.city ?? undefined),
          street: cleanText(dto.street ?? undefined),
          house: cleanText(dto.house ?? undefined),
          apartment: cleanText(dto.apartment ?? undefined),
          entrance: cleanText(dto.entrance ?? undefined),
          floor: cleanText(dto.floor ?? undefined),
          intercom: cleanText(dto.intercom ?? undefined),
          postalCode: cleanText(dto.postalCode ?? undefined),
          comment: cleanText(dto.comment ?? undefined),
          recipientName: cleanText(dto.recipientName ?? undefined),
          recipientPhone,
          fullAddress,
          isDefault: Boolean(dto.isDefault),
        },
      });
    });
  }
  async updateMyAddress(userId, addressId, dto) {
    const existing = await this.prisma.userAddress.findFirst({
      where: { id: addressId, userId },
    });
    if (!existing) {
      throw new common_1.BadRequestException("Адрес не найден");
    }
    const recipientPhoneRaw = cleanText(dto.recipientPhone ?? undefined);
    const recipientPhone =
      recipientPhoneRaw !== null
        ? (0, phone_1.normalizeRuPhone)(recipientPhoneRaw)
        : undefined;
    if (recipientPhoneRaw && !recipientPhone) {
      throw new common_1.BadRequestException("Некорректный телефон получателя");
    }
    const fullAddressCandidate =
      cleanText(dto.fullAddress ?? undefined) ?? buildAddressLine(dto);
    const fullAddress =
      fullAddressCandidate ??
      (dto.fullAddress !== undefined ? null : undefined);
    if (dto.fullAddress !== undefined && !fullAddress) {
      throw new common_1.BadRequestException("Адрес обязателен");
    }
    return this.prisma.$transaction(async (tx) => {
      if (dto.isDefault) {
        await tx.userAddress.updateMany({
          where: { userId },
          data: { isDefault: false },
        });
      }
      return tx.userAddress.update({
        where: { id: addressId },
        data: {
          ...(dto.label !== undefined
            ? { label: cleanText(dto.label ?? undefined) }
            : {}),
          ...(dto.country !== undefined
            ? { country: cleanText(dto.country ?? undefined) ?? "Россия" }
            : {}),
          ...(dto.city !== undefined
            ? { city: cleanText(dto.city ?? undefined) }
            : {}),
          ...(dto.street !== undefined
            ? { street: cleanText(dto.street ?? undefined) }
            : {}),
          ...(dto.house !== undefined
            ? { house: cleanText(dto.house ?? undefined) }
            : {}),
          ...(dto.apartment !== undefined
            ? { apartment: cleanText(dto.apartment ?? undefined) }
            : {}),
          ...(dto.entrance !== undefined
            ? { entrance: cleanText(dto.entrance ?? undefined) }
            : {}),
          ...(dto.floor !== undefined
            ? { floor: cleanText(dto.floor ?? undefined) }
            : {}),
          ...(dto.intercom !== undefined
            ? { intercom: cleanText(dto.intercom ?? undefined) }
            : {}),
          ...(dto.postalCode !== undefined
            ? { postalCode: cleanText(dto.postalCode ?? undefined) }
            : {}),
          ...(dto.comment !== undefined
            ? { comment: cleanText(dto.comment ?? undefined) }
            : {}),
          ...(dto.recipientName !== undefined
            ? { recipientName: cleanText(dto.recipientName ?? undefined) }
            : {}),
          ...(dto.recipientPhone !== undefined ? { recipientPhone } : {}),
          ...(fullAddress !== undefined ? { fullAddress } : {}),
          ...(dto.isDefault !== undefined ? { isDefault: dto.isDefault } : {}),
        },
      });
    });
  }
  async deleteMyAddress(userId, addressId) {
    const existing = await this.prisma.userAddress.findFirst({
      where: { id: addressId, userId },
      select: { id: true },
    });
    if (!existing) throw new common_1.BadRequestException("Адрес не найден");
    await this.prisma.userAddress.delete({ where: { id: addressId } });
    return { ok: true };
  }
  async ensureUserExists(userId) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true },
    });
    if (!user) throw new common_1.UnauthorizedException("User not found");
    return user;
  }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate(
  [
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [
      prisma_service_1.PrismaService,
      jwt_1.JwtService,
    ]),
  ],
  AuthService,
);
//# sourceMappingURL=auth.service.js.map
