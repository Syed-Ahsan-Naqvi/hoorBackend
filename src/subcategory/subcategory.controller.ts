import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { SubCategoryService } from "./subcategory.service";
import { CreateCategoryDto } from "src/dtos/Category.dto";

@Controller("/api/subcategory")
export class SubCategoryController {
  constructor(private readonly subcategoryService: SubCategoryService) {}

  @Get("/")
  async getSubCategoryData() {
    return this.subcategoryService.getSubCategoryData();
  }

  @Get("/:id")
  async getSubCategoryByIdData(@Param() id: any) {
    return this.subcategoryService.getSubCategoryByIdData(id.id);
  }

  @Delete("/:id")
  async deleteSubCategoryByIdData(@Param() id: any) {
    return this.subcategoryService.deleteSubCategoryByIdData(id.id);
  }

  @Post("/")
  async postSubCategoryData(@Body() data: any) {
    console.log(data);
    return this.subcategoryService.postSubCategoryData(data);
  }

  @Put(":id")
  async updateSubCategoryById(@Param("id") id: number, @Body() data: any) {
    // Purani images ke saath new URLs append karo
    return this.subcategoryService.updateSubCategoryById(id, data);
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
