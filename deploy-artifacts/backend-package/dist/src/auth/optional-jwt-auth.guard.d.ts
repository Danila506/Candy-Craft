declare const OptionalJwtAuthGuard_base: import("@nestjs/passport").Type<
  import("@nestjs/passport").IAuthGuard
>;
export declare class OptionalJwtAuthGuard extends OptionalJwtAuthGuard_base {
  handleRequest<TUser = any>(
    err: any,
    user: TUser,
    _info: any,
    _context: any,
  ): TUser | null;
}
export {};
