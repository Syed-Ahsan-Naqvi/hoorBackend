import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { CartController } from "./cart.controller";
import { CartService } from "./cart.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Cart } from "../entities/cart.entity";
import { LoggerMiddleware } from "src/middlewares/authFetchUserData.middleware";

@Module({
  imports: [TypeOrmModule.forFeature([Cart])],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("/api/cart");
    // "/api/auth/getAllUsers",
    // "/api/auth/deleteUser/:id",
    // "/api/auth/updateUser/:id"
  }
}
