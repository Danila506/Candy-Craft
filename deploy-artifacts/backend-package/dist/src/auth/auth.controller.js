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
var __metadata =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
var __param =
  (this && this.__param) ||
  function (paramIndex, decorator) {
    return function (target, key) {
      decorator(target, key, paramIndex);
    };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const crypto_1 = require("crypto");
const auth_service_1 = require("./auth.service");
const login_dto_1 = require("./dto/login.dto");
const create_user_dto_1 = require("./dto/create-user.dto");
const jwt_auth_guard_1 = require("./jwt-auth.guard");
const update_profile_dto_1 = require("./dto/update-profile.dto");
const create_user_address_dto_1 = require("./dto/create-user-address.dto");
const update_user_address_dto_1 = require("./dto/update-user-address.dto");
const rate_limit_decorator_1 = require("../security/rate-limit.decorator");
const rate_limit_guard_1 = require("../security/rate-limit.guard");
function cookieBaseOptions() {
  const isProd = process.env.NODE_ENV === "production";
  return {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
    path: "/",
  };
}
function getFrontendBaseUrl() {
  return (process.env.FRONTEND_URL || "http://localhost:5173").replace(
    /\/+$/,
    "",
  );
}
function getRequiredOAuthEnv(name) {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new common_1.UnauthorizedException(
      `OAuth provider is not configured: ${name}`,
    );
  }
  return value;
}
function setAuthCookies(res, tokens) {
  res.cookie("access_token", tokens.accessToken, {
    ...cookieBaseOptions(),
    maxAge: 15 * 60 * 1000,
  });
  res.cookie("refresh_token", tokens.refreshToken, {
    ...cookieBaseOptions(),
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
}
function base64Url(buffer) {
  return buffer
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}
function createVkPkcePair() {
  const codeVerifier = base64Url((0, crypto_1.randomBytes)(64));
  const codeChallenge = base64Url(
    (0, crypto_1.createHash)("sha256").update(codeVerifier).digest(),
  );
  return { codeVerifier, codeChallenge };
}
let AuthController = class AuthController {
  auth;
  constructor(auth) {
    this.auth = auth;
  }
  async me(req) {
    const userId = req.user?.userId;
    if (!userId) throw new common_1.UnauthorizedException();
    return this.auth.me(userId);
  }
  create(createUserDto) {
    return this.auth.register(createUserDto);
  }
  async login(dto, res) {
    const { accessToken, refreshToken, user } = await this.auth.login(
      dto.email,
      dto.password,
    );
    res.cookie("access_token", accessToken, {
      ...cookieBaseOptions(),
      maxAge: 15 * 60 * 1000,
    });
    res.cookie("refresh_token", refreshToken, {
      ...cookieBaseOptions(),
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    return { user };
  }
  async googleAuth() {
    return null;
  }
  async googleCallback(req, res) {
    const { accessToken, refreshToken } = await this.auth.googleLogin(req.user);
    setAuthCookies(res, { accessToken, refreshToken });
    return res.redirect(`${getFrontendBaseUrl()}/account`);
  }
  async yandexAuth(res) {
    const params = new URLSearchParams({
      response_type: "code",
      client_id: getRequiredOAuthEnv("YANDEX_CLIENT_ID"),
      redirect_uri: getRequiredOAuthEnv("YANDEX_CALLBACK_URL"),
      scope: "login:email login:info",
    });
    return res.redirect(`https://oauth.yandex.ru/authorize?${params}`);
  }
  async yandexCallback(req, res) {
    const code = req.query?.code;
    if (!code)
      throw new common_1.UnauthorizedException("Yandex OAuth code is missing");
    const { accessToken, refreshToken } = await this.auth.yandexLogin(code);
    setAuthCookies(res, { accessToken, refreshToken });
    return res.redirect(`${getFrontendBaseUrl()}/account`);
  }
  async vkAuth(res) {
    const state = (0, crypto_1.randomBytes)(24).toString("hex");
    const { codeVerifier, codeChallenge } = createVkPkcePair();
    res.cookie("vk_oauth_state", state, {
      ...cookieBaseOptions(),
      maxAge: 10 * 60 * 1000,
    });
    res.cookie("vk_code_verifier", codeVerifier, {
      ...cookieBaseOptions(),
      maxAge: 10 * 60 * 1000,
    });
    const params = new URLSearchParams({
      client_id: getRequiredOAuthEnv("VK_CLIENT_ID"),
      redirect_uri: getRequiredOAuthEnv("VK_CALLBACK_URL"),
      response_type: "code",
      scope: "vkid.personal_info email",
      state,
      code_challenge: codeChallenge,
      code_challenge_method: "S256",
    });
    const vkIdBaseUrl = process.env.VK_ID_BASE_URL || "https://id.vk.com";
    return res.redirect(`${vkIdBaseUrl}/authorize?${params}`);
  }
  async vkCallback(req, res) {
    const code = req.query?.code;
    const deviceId = req.query?.device_id;
    const state = req.query?.state;
    const storedState = req.cookies?.vk_oauth_state;
    const codeVerifier = req.cookies?.vk_code_verifier;
    if (!code)
      throw new common_1.UnauthorizedException("VK OAuth code is missing");
    if (!deviceId) {
      throw new common_1.UnauthorizedException("VK OAuth device_id is missing");
    }
    if (!state || !storedState || state !== storedState) {
      throw new common_1.UnauthorizedException("VK OAuth state is invalid");
    }
    if (!codeVerifier) {
      throw new common_1.UnauthorizedException(
        "VK OAuth code verifier is missing",
      );
    }
    const { accessToken, refreshToken } = await this.auth.vkLogin({
      code,
      deviceId,
      codeVerifier,
      state,
    });
    setAuthCookies(res, { accessToken, refreshToken });
    res.clearCookie("vk_oauth_state", { ...cookieBaseOptions() });
    res.clearCookie("vk_code_verifier", { ...cookieBaseOptions() });
    return res.redirect(`${getFrontendBaseUrl()}/account`);
  }
  async refresh(req, res) {
    const rt = req.cookies?.refresh_token;
    if (!rt) return { ok: false };
    const { accessToken, refreshToken } = await this.auth.refresh(rt);
    res.cookie("access_token", accessToken, {
      ...cookieBaseOptions(),
      maxAge: 15 * 60 * 1000,
    });
    res.cookie("refresh_token", refreshToken, {
      ...cookieBaseOptions(),
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    return { ok: true };
  }
  async logout(req, res) {
    const rt = req.cookies?.refresh_token;
    if (rt) await this.auth.logout(rt);
    res.clearCookie("access_token", { ...cookieBaseOptions() });
    res.clearCookie("refresh_token", { ...cookieBaseOptions() });
    return { ok: true };
  }
  async updateMe(req, dto) {
    const userId = req.user?.userId;
    return this.auth.updateMe(userId ?? 0, dto);
  }
  async getMyAddresses(req) {
    const userId = req.user?.userId;
    if (!userId) throw new common_1.UnauthorizedException();
    return this.auth.listMyAddresses(userId);
  }
  async createMyAddress(req, dto) {
    const userId = req.user?.userId;
    if (!userId) throw new common_1.UnauthorizedException();
    return this.auth.createMyAddress(userId, dto);
  }
  async updateMyAddress(req, addressId, dto) {
    const userId = req.user?.userId;
    if (!userId) throw new common_1.UnauthorizedException();
    return this.auth.updateMyAddress(userId, addressId, dto);
  }
  async deleteMyAddress(req, addressId) {
    const userId = req.user?.userId;
    if (!userId) throw new common_1.UnauthorizedException();
    return this.auth.deleteMyAddress(userId, addressId);
  }
};
exports.AuthController = AuthController;
__decorate(
  [
    (0, common_1.Get)("me"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request]),
    __metadata("design:returntype", Promise),
  ],
  AuthController.prototype,
  "me",
  null,
);
__decorate(
  [
    (0, common_1.Post)("register"),
    (0, common_1.UseGuards)(rate_limit_guard_1.RateLimitGuard),
    (0, rate_limit_decorator_1.RateLimit)({
      keyPrefix: "auth:register",
      maxEnv: "AUTH_REGISTER_RATE_LIMIT_MAX",
      windowMsEnv: "AUTH_REGISTER_RATE_LIMIT_WINDOW_MS",
      defaultMax: 10,
      defaultWindowMs: 15 * 60 * 1000,
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", void 0),
  ],
  AuthController.prototype,
  "create",
  null,
);
__decorate(
  [
    (0, common_1.Post)("login"),
    (0, common_1.UseGuards)(rate_limit_guard_1.RateLimitGuard),
    (0, rate_limit_decorator_1.RateLimit)({
      keyPrefix: "auth:login",
      maxEnv: "AUTH_LOGIN_RATE_LIMIT_MAX",
      windowMsEnv: "AUTH_LOGIN_RATE_LIMIT_WINDOW_MS",
      defaultMax: 10,
      defaultWindowMs: 15 * 60 * 1000,
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto, Object]),
    __metadata("design:returntype", Promise),
  ],
  AuthController.prototype,
  "login",
  null,
);
__decorate(
  [
    (0, common_1.Get)("google"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("google")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise),
  ],
  AuthController.prototype,
  "googleAuth",
  null,
);
__decorate(
  [
    (0, common_1.Get)("google/callback"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("google")),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, Object]),
    __metadata("design:returntype", Promise),
  ],
  AuthController.prototype,
  "googleCallback",
  null,
);
__decorate(
  [
    (0, common_1.Get)("yandex"),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise),
  ],
  AuthController.prototype,
  "yandexAuth",
  null,
);
__decorate(
  [
    (0, common_1.Get)("yandex/callback"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, Object]),
    __metadata("design:returntype", Promise),
  ],
  AuthController.prototype,
  "yandexCallback",
  null,
);
__decorate(
  [
    (0, common_1.Get)("vk"),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise),
  ],
  AuthController.prototype,
  "vkAuth",
  null,
);
__decorate(
  [
    (0, common_1.Get)("vk/callback"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, Object]),
    __metadata("design:returntype", Promise),
  ],
  AuthController.prototype,
  "vkCallback",
  null,
);
__decorate(
  [
    (0, common_1.Post)("refresh"),
    (0, common_1.UseGuards)(rate_limit_guard_1.RateLimitGuard),
    (0, rate_limit_decorator_1.RateLimit)({
      keyPrefix: "auth:refresh",
      maxEnv: "AUTH_REFRESH_RATE_LIMIT_MAX",
      windowMsEnv: "AUTH_REFRESH_RATE_LIMIT_WINDOW_MS",
      defaultMax: 30,
      defaultWindowMs: 15 * 60 * 1000,
    }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, Object]),
    __metadata("design:returntype", Promise),
  ],
  AuthController.prototype,
  "refresh",
  null,
);
__decorate(
  [
    (0, common_1.Post)("logout"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, Object]),
    __metadata("design:returntype", Promise),
  ],
  AuthController.prototype,
  "logout",
  null,
);
__decorate(
  [
    (0, common_1.Patch)("me"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [
      Request,
      update_profile_dto_1.UpdateProfileDto,
    ]),
    __metadata("design:returntype", Promise),
  ],
  AuthController.prototype,
  "updateMe",
  null,
);
__decorate(
  [
    (0, common_1.Get)("me/addresses"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request]),
    __metadata("design:returntype", Promise),
  ],
  AuthController.prototype,
  "getMyAddresses",
  null,
);
__decorate(
  [
    (0, common_1.Post)("me/addresses"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [
      Request,
      create_user_address_dto_1.CreateUserAddressDto,
    ]),
    __metadata("design:returntype", Promise),
  ],
  AuthController.prototype,
  "createMyAddress",
  null,
);
__decorate(
  [
    (0, common_1.Patch)("me/addresses/:addressId"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)("addressId", common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [
      Request,
      Number,
      update_user_address_dto_1.UpdateUserAddressDto,
    ]),
    __metadata("design:returntype", Promise),
  ],
  AuthController.prototype,
  "updateMyAddress",
  null,
);
__decorate(
  [
    (0, common_1.Delete)("me/addresses/:addressId"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)("addressId", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, Number]),
    __metadata("design:returntype", Promise),
  ],
  AuthController.prototype,
  "deleteMyAddress",
  null,
);
exports.AuthController = AuthController = __decorate(
  [
    (0, common_1.Controller)("auth"),
    __metadata("design:paramtypes", [auth_service_1.AuthService]),
  ],
  AuthController,
);
//# sourceMappingURL=auth.controller.js.map
