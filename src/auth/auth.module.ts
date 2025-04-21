import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../entities/auth.entity";
import { LoggerMiddleware } from "src/middlewares/authFetchUserData.middleware";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(
        "/api/auth/getAllUsers",
        "/api/auth/deleteUser",
        "/api/auth/updateUser",
        "/api/auth/check-validity"
      );
  }
}
