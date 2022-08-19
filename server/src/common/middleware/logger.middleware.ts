import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class RequestLogger implements NestMiddleware {
  use({ url, method }: Request, res: Response, next: NextFunction) {
    console.log("*Request*\n", " -- Method:", method, "  URL: ", url);
    next();
  }
}
