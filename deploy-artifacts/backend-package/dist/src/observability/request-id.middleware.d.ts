import type { NextFunction, Request, Response } from "express";
export declare const REQUEST_ID_HEADER = "x-request-id";
declare module "express-serve-static-core" {
  interface Request {
    requestId?: string;
  }
}
export declare function requestIdMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): void;
