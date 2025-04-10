import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { ProductService } from "./product.service";
import { FilesInterceptor } from "@nestjs/platform-express";

@Controller("/api/product")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get("/")
  async getProductData() {
    return this.productService.getProductData();
  }

  @Get("/:id")
  async getProductByIdData(@Param() id: any) {
    return this.productService.getProductByIdData(id.id);
  }

  @Delete("/:id")
  async deleteProductByIdData(@Param() id: any) {
    return this.productService.deleteProductByIdData(id.id);
  }

  @Delete("/:id/images")
  async deleteImage(@Param("id") id: number, @Body() data: any) {
    await this.productService.removeImageFromItem(id, data.url);
  }

  @Post("/createProduct")
  @UseInterceptors(FilesInterceptor("images"))
  async postProductData(
    @Body() data: any,
    @UploadedFiles() files: Express.Multer.File[]
  ) {
    return this.productService.postProductData(data, files);
  }

  @Put(":id")
  @UseInterceptors(FilesInterceptor("images"))
  async updateProductById(
    @Param("id") id: number,
    @Body() data: any,
    @UploadedFiles() files?: Express.Multer.File[]
  ) {
    return this.productService.updateProductById(id, data, files);
  }

  // @Post("/login")
  // async login(@Body() data: LoginUserDto) {
  //   return this.authService.login(data);
  // }

  // @Post("/getUserDataByToken")
  // async getUserDataByToken(@Req() req: any) {
  //   const user = req.user;
  //   return this.authService.getUserDataByToken(user);
  // }
}
