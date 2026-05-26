import { Strategy, type Profile } from "passport-google-oauth20";
declare const GoogleStrategy_base: new (
  ...args:
    | [options: import("passport-google-oauth20").StrategyOptionsWithRequest]
    | [options: import("passport-google-oauth20").StrategyOptions]
    | [options: import("passport-google-oauth20").StrategyOptions]
    | [options: import("passport-google-oauth20").StrategyOptionsWithRequest]
) => Strategy & {
  validate(...args: any[]): unknown;
};
export declare class GoogleStrategy extends GoogleStrategy_base {
  constructor();
  validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ): Promise<{
    email: string | null;
    firstName: string;
    lastName: string;
    googleId: string;
  }>;
}
export {};
