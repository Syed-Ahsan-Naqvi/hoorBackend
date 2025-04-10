import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { CategoryController } from "./category.controller";
import { CategoryService } from "./category.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CloudinaryService } from "./cloudinary.service";
import { Category } from "src/entities/category.entity";
import { SubCategory } from "src/entities/subCategory.entity";
import { SubCategoryController } from "src/subcategory/subcategory.controller";
import { SubCategoryService } from "src/subcategory/subcategory.service";

@Module({
  imports: [TypeOrmModule.forFeature([Category, SubCategory])],
  controllers: [CategoryController, SubCategoryController],
  providers: [CategoryService, SubCategoryService, CloudinaryService],
})
export class CategoryModule {}
