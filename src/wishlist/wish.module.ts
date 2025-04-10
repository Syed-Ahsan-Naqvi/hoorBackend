import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { WishController } from "./wish.controller";
import { WishService } from "./wish.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LoggerMiddleware } from "src/middlewares/authFetchUserData.middleware";
import { Wish } from "src/entities/wish.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Wish])],
  controllers: [WishController],
  providers: [WishService],
})
export class WishModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(
        "/api/wish/getAllWish",
        "/api/wish/addWish",
        "/api/wish/deleteWish/:id",
        "/api/wish/WishListById"
      );
  }
}
