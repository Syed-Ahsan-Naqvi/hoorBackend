import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from "@nestjs/common";
import { request } from "express";
import { CartService } from "src/cart/cart.service";

@Controller("/api/cart")
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get("/getAllCart")
  async getCartData(@Req() request: any) {
    return this.cartService.getCartData(request);
  }

  @Get("/getAllCartById")
  async getAllCartById(@Req() request: any) {
    return this.cartService.getAllCartById(request);
  }

  @Post("/addCart")
  async postCartData(@Req() request: any, @Body() data: any) {
    return this.cartService.postCartData(request, data);
  }

  @Delete("/deleteCartData/:id")
  async deleteCartData(@Req() request: any, @Param("id") id: number) {
    return this.cartService.deleteCartData(request, id);
  }

  @Delete("/deleteAllCart")
  async deleteAllCart(@Req() request: any) {
    return this.cartService.deleteAllCart(request);
  }

  @Put("/updateCart/:id")
  async updateCart(
    @Req() request: any,
    @Param("id") id: any,
    @Body() data: any
  ) {
    return this.cartService.updateCart(request, id, data);
  }
}
