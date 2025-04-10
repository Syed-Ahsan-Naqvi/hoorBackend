import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

const JWT_SECRET = "your_jwt_secret"; // Use environment variables for secrets

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Extract token from headers
    const token = req.headers.token;
    // Check if token exists
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Token not provided" });
    }

    try {
      const decoded = jwt.verify(token.toString(), JWT_SECRET);
      req.user = decoded;

      next();
    } catch (error) {
      // Handle invalid token
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
  }
}
