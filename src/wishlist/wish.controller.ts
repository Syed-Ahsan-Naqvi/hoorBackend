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
import { WishService } from "src/wishlist/wish.service";

@Controller("/api/wish")
export class WishController {
  constructor(private readonly wishService: WishService) {}

  @Get("/getAllWish")
  async getWishList(@Req() request: any) {
    return this.wishService.getWishList(request);
  }

  @Get("/WishListById")
  async getWishListById(@Req() request: any) {
    return this.wishService.getWishListById(request);
  }

  @Post("/addWish")
  async postWishList(@Req() request: any, @Body() data: any) {
    return this.wishService.postWishList(request, data);
  }

  @Delete("/deleteWish/:id")
  async deleteWishData(@Req() request: any, @Param("id") id: number) {
    return this.wishService.deleteWishData(request, id);
  }
}
