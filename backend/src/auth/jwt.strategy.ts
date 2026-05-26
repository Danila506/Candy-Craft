import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    const jwtSecret = process.env.JWT_ACCESS_SECRET;
    if (!jwtSecret) {
      throw new Error('JWT_ACCESS_SECRET is not set');
    }
    function cookieExtractor(req: any): string | null {
      return req?.cookies?.access_token || null;
    }

    super({
      jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
      secretOrKey: jwtSecret,
    });
  }

  async validate(payload: {
    sub: number;
    email?: string | null;
    role?: string;
  }) {
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}
