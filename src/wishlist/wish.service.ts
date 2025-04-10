import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { Wish } from "src/entities/wish.entity";
const JWT_SECRET = "your_jwt_secret";

@Injectable()
export class WishService {
  constructor(
    @InjectRepository(Wish)
    private wishRepository: Repository<Wish>
  ) {}

  // Getting All Data From Auth
  async getWishList(req: any) {
    try {
      // Fetch all users (excluding admin)
      const allWishList = await this.wishRepository.find();

      return {
        success: true,
        message: "All Wish List",
        data: allWishList,
      };
    } catch (error) {
      console.error("Error fetching wish list:", error);
      return {
        success: false,
        message: "Failed to fetch wish list",
        error: error.message,
      };
    }
  }

  async getWishListById(req: any) {
    try {
      // Fetch all users (excluding admin)
      const wishList = await this.wishRepository.find({
        where: { userId: req?.user?.id },
      });

      //   console.log(wishList);

      return {
        success: true,
        message: "All Wish List",
        data: wishList,
      };
    } catch (error) {
      console.error("Error fetching Wish List:", error);
      return {
        success: false,
        message: "Failed to fetch wish list",
        error: error.message,
      };
    }
  }

  // Post Cart Data
  async postWishList(request: any, data: any) {
    console.log(data);
    try {
      const check = await this.wishRepository.find({
        where: { productId: data?.productId, userId: request?.user?.id },
      });

      if (check.length !== 0) {
        return { success: false, message: "Product Already Exists" };
      } else {
        const wish = this.wishRepository.create({
          productTitle: data?.productTitle,
          image: data?.image,
          rating: data?.rating,
          price: data?.price,
          brand: data?.brand,
          productId: data?.productId,
          userId: request?.user?.id,
        });

        // Saving Data in Database
        const result = await this.wishRepository.save(wish);

        return {
          success: true,
          message: "Product Added To Wish List",
          data: result,
        };
      }
    } catch (error) {
      return {
        success: false,
        message: "Failed to Add Product",
        error: error.message,
      };
    }
  }

  async deleteWishData(req: any, id: any) {
    try {
      // Check if user exists
      const cartData = await this.wishRepository.find({
        where: { productId: id, userId: req?.user?.id },
      });

      if (cartData.length === 0) {
        return { success: false, message: "Product Not Found" };
      } else {
        // Delete user
        await this.wishRepository.delete(cartData[0]?.id);
        return { success: true, message: "Product Removed successfully" };
      }
    } catch (error) {
      console.error("Error removing product:", error);
      return {
        success: false,
        message: "Failed to remove product",
        error: error.message,
      };
    }
  }

  // async updateCart(request: any, id: any, data: any) {
  //     try {
  //         // Check if user exists
  //         const cartData = await this.cartRepository.find({
  //             where: { id: id, userId: request?.user?.id },
  //         });

  //         if (cartData.length === 0) {
  //             return { success: false, message: "Product not found" };
  //         } else {
  //             const newProduct = {
  //                 productTitle: data.productTitle || cartData[0]?.productTitle,
  //                 image: data.image || cartData[0]?.image,
  //                 rating: data?.rating || cartData[0]?.rating,
  //                 price: data.price || cartData[0]?.price,
  //                 quantity: data.quantity || cartData[0]?.quantity,
  //                 subTotal: data.subTotal || cartData[0]?.subTotal,
  //                 productId: data.productId || cartData[0]?.productId,
  //                 brand: data.brand || cartData[0]?.brand,
  //                 userId: request?.user?.id,
  //             }

  //             const newUser = await this.cartRepository.update(id, newProduct);

  //             // Fetch updated user from DB

  //             return {
  //                 success: true,
  //                 message: "Product updated successfully",
  //                 data: newUser,
  //             };
  //         }

  //     } catch (error) {
  //         console.error("Error updating user:", error);
  //         return {
  //             success: false,
  //             message: "Failed to update user",
  //             error: error.message,
  //         };
  //     }
  // }
}
