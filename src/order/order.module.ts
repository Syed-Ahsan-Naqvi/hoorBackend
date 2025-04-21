import { MiddlewareConsumer, Module } from "@nestjs/common";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";
import { LoggerMiddleware } from "src/middlewares/authFetchUserData.middleware";
import { Order } from "src/entities/order.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes("/api/order/getAllOrders", "/api/order/createOrder");
  }
}
