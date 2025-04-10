import { HttpException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities/auth.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "src/dtos/auth.dto";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { Category } from "src/entities/category.entity";
import { CreateCategoryDto } from "src/dtos/Category.dto";
const JWT_SECRET = "your_jwt_secret";
import pLimit from "p-limit";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryService } from "./cloudinary.service";

cloudinary.config({
  cloud_name: "dbxuynhy0",
  api_key: "214768323283339",
  api_secret: "5IGw31yNn_50ZkimD8fG2Autrww", // Click 'View API Keys' above to copy your API secret
});

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    private readonly cloudinaryService: CloudinaryService
  ) {}

  // Getting All Data From Auth
  async getCategoryData() {
    const data = await this.categoryRepository.find();
    return { message: "All Data From Category", data: data };
  }

  // Getting All Data From Id
  async getCategoryByIdData(id: any) {
    const data = await this.categoryRepository.findOne({ where: { id } });
    return { message: "All Data From Category", data: data };
  }

  // Delete Data From Id
  async deleteCategoryByIdData(id: any) {
    const item = await this.categoryRepository.findOne({ where: { id } });
    if (!item) {
      throw new NotFoundException("Item not found");
    }

    // Delete all images from Cloudinary
    if (item.images && item.images.length > 0) {
      await Promise.all(
        item.images.map((url) => this.cloudinaryService.deleteImage(url))
      );
    }

    const result = await this.categoryRepository.delete(id);
    return { message: "Data Deleted", data: result };
  }

  async postCategoryData(data: any, files: Express.Multer.File[]) {
    const imageUrls = await Promise.all(
      files.map((file) => this.cloudinaryService.uploadImage(file))
    );

    const finalData = {
      name: data.name,
      images: imageUrls,
      color: data.color,
    };

    const result = await this.categoryRepository.save(finalData);
    return { message: "Category Data Added", result };
  }

  async removeImageFromItem(id: number, imageUrl: string) {
    // console.log(id, imageUrl);
    const item = await this.categoryRepository.findOne({ where: { id } });
    // console.log(item);
    item.images = item.images.filter((url) => url !== imageUrl);
    // console.log(item.images);
    await this.cloudinaryService.deleteImage(imageUrl); // Cloudinary se delete
    return this.categoryRepository.update(id, {
      images: item.images,
    });
  }

  async updateCategoryById(
    id: number,
    data: any,
    files: Express.Multer.File[]
  ) {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException("Item not found");
    }

    let newImageUrls: string[] = [];

    // Upload new images (if any)
    if (files && files.length > 0) {
      newImageUrls = await Promise.all(
        files.map((file) => this.cloudinaryService.uploadImage(file))
      );
    }

    if (files && files.length > 0) {
      category.images.map((img) => {
        newImageUrls.push(img);
      });
    } else {
      newImageUrls = category.images;
    }

    // Updating fields
    const result = await this.categoryRepository.update(id, {
      name: data.name,
      images: newImageUrls,
      color: data.color,
    });

    return { message: "Category Updated Successfully", result };
  }
}
