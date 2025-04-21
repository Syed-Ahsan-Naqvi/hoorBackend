import { Body, Controller, Get, Post, Req } from "@nestjs/common";
import { OrderService } from "./order.service";

@Controller("/api/order")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get("/getAllOrders")
  async getAllOrdersData(@Req() req: any) {
    return this.orderService.getAllOrdersData(req);
  }

  //   @Get("/getOrderByUserId")
  //   async getOrderByUserId(@Req() req: any) {
  //     return this.orderService.getOrderByUserId(req);
  //   }

  @Post("/createOrder")
  async createOrder(@Req() req: any, @Body() body: any) {
    return this.orderService.createOrder(req, body);
  }
  //   @Post("/updateOrder")
  //   async updateOrder(@Req() req: any) {
  //     return this.orderService.updateOrder(req);
  //   }
  //   @Post("/deleteOrder")
  //   async deleteOrder(@Req() req: any) {
  //     return this.orderService.deleteOrder(req);
  //   }
}
