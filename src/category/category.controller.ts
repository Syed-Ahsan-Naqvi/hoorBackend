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
import { CategoryService } from "./category.service";
import { CreateUserDto, LoginUserDto } from "src/dtos/auth.dto";
import { CreateCategoryDto } from "src/dtos/Category.dto";
import { FilesInterceptor } from "@nestjs/platform-express";
import { CloudinaryService } from "src/category/cloudinary.service";

@Controller("/api/category")
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly cloudinaryService: CloudinaryService
  ) {}

  @Get("/")
  async getCategoryData() {
    return this.categoryService.getCategoryData();
  }

  @Get("/:id")
  async getCategoryByIdData(@Param() id: any) {
    return this.categoryService.getCategoryByIdData(id.id);
  }

  @Delete("/:id")
  async deleteCategoryByIdData(@Param() id: any) {
    return this.categoryService.deleteCategoryByIdData(id.id);
  }

  @Delete("/:id/images")
  async deleteImage(@Param("id") id: number, @Body() data: any) {
    await this.categoryService.removeImageFromItem(id, data.url);
  }

  @Post("/createCategory")
  @UseInterceptors(FilesInterceptor("images")) // 'images' = form-data field name
  async postCategoryData(
    @Body() data: CreateCategoryDto,
    @UploadedFiles() files: Express.Multer.File[]
  ) {
    return this.categoryService.postCategoryData(data, files);
  }

  @Put(":id")
  @UseInterceptors(FilesInterceptor("images"))
  async updateItem(
    @Param("id") id: number,
    @Body() data: any,
    @UploadedFiles() files?: Express.Multer.File[]
  ) {
    // Purani images ke saath new URLs append karo
    return this.categoryService.updateCategoryById(id, data, files);
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
