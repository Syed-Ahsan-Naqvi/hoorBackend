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
import { Product } from "src/entities/product.entity";
import { CloudinaryService } from "src/product/cloudinary.service";

cloudinary.config({
  cloud_name: "dbxuynhy0",
  api_key: "214768323283339",
  api_secret: "5IGw31yNn_50ZkimD8fG2Autrww", // Click 'View API Keys' above to copy your API secret
});

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    @InjectRepository(Category)
    private productRepository: Repository<Product>,
    private readonly cloudinaryService: CloudinaryService
  ) {}

  async getProductData() {
    const data = await this.productRepository.find({
      relations: ["category", "subCategory"], // Fetch related category data
    });
    return { message: "All Products", data: data };
  }

  // Getting All Data From Id
  async getProductByIdData(id: any) {
    const data = await this.productRepository.findOne({ where: { id } });
    return { message: "Product Data by ID", data: data };
  }

  // Delete Data From Id
  async deleteProductByIdData(id: any) {
    const item = await this.productRepository.findOne({ where: { id } });

    if (!item) {
      throw new NotFoundException("Product not found");
    }

    // Delete all images from Cloudinary
    if (item.images && item.images.length > 0) {
      await Promise.all(
        item.images.map((url) => this.cloudinaryService.deleteImage(url))
      );
    }

    const result = await this.productRepository.delete(id);

    return { message: "Data Deleted", data: result };
  }

  // Post Product Data
  async postProductData(data: any, files: Express.Multer.File[]) {
    try {
      const imageUrls = await Promise.all(
        files.map((file) => this.cloudinaryService.uploadImage(file))
      );

      // ✅ Final Data
      const finalData = {
        name: data.name,
        description: data.description,
        images: imageUrls,
        brand: data.brand,
        discount: data.discount,
        price: data.price,
        oldPrice: data.oldPrice,
        countInStock: data.countInStock,
        rating: data.rating || 0,
        // numReviews: data.numReviews || 0,
        isFeatured: JSON.parse(data.isFeatured) || false,
        category: data.category,
        subCategory: data.subCategory,
      };

      // ✅ Save Product
      const result = await this.productRepository.save(finalData);
      return { message: "Product Data Added", success: true, result };
    } catch (error) {
      return {
        message: "Something went wrong!",
        success: false,
        error: error.message,
      };
    }
  }

  async removeImageFromItem(id: number, imageUrl: string) {
    // console.log(id, imageUrl);
    const item = await this.productRepository.findOne({ where: { id } });
    // console.log(item);
    item.images = item.images.filter((url) => url !== imageUrl);
    // console.log(item.images);
    await this.cloudinaryService.deleteImage(imageUrl); // Cloudinary se delete
    await this.productRepository.update(id, {
      images: item.images,
    });

    return { message: "Product Updated Successfully", success: true };
  }

  async updateProductById(id: number, data: any, files: Express.Multer.File[]) {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
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
      product.images.map((img) => {
        newImageUrls.push(img);
      });
    } else {
      newImageUrls = product.images;
    }
    // let imageUrl = product.images; // Purani images rakho

    // if (data.images && data.images.length > 0) {
    //   const limit = pLimit(2);
    //   const imagesToUpload = data.images.map((image) => {
    //     return limit(async () => {
    //       const result = await cloudinary.uploader.upload(image);
    //       return result;
    //     });
    //   });

    //   const uploadStatus = await Promise.all(imagesToUpload);
    //   imageUrl = uploadStatus.map((item) => item.secure_url);
    // }

    // Updating fields
    const result = await this.productRepository.update(id, {
      name: data.name || product.name,
      description: data.description || product.description,
      images: newImageUrls,
      brand: data.brand || product.brand,
      discount: data.discount || product.discount,
      price: data.price || product.price,
      oldPrice: data.oldPrice || product.oldPrice,
      countInStock: data.countInStock || product.countInStock,
      rating: data.rating || product.rating || 0,
      // numReviews: data.numReviews || product.numReviews || 0,
      isFeatured: JSON.parse(data.isFeatured) || product.isFeatured || false,
      category: data.category || product.category,
      subCategory: data.subCategory || product.subCategory,
    });

    return { message: "Product Updated Successfully", result };
  }

  // Posting Data To Auth
  //   async postAuthData(data: CreateUserDto) {
  //     const check = await this.categoryRepository.find();
  //     if (check) {
  //       return { message: "Email Already Exists" };
  //     } else {
  //       // Hashing Password
  //       let salt = await bcrypt.genSalt(10);
  //       const hashedPassword = await bcrypt.hash(data.password, salt);

  //       // Saving Data
  //       const user = {
  //         name: data.name,
  //         email: data.email,
  //         password: hashedPassword,
  //       };
  //       const result = await this.categoryRepository.save(user);

  //       // Creating JWT Token
  //       const jwtData = jwt.sign(result, JWT_SECRET);

  //       // Returning Data With Token
  //       return { message: "Data Added", dataToken: jwtData };
  //     }
  //   }
  // }

  // Posting Data to Category
}
