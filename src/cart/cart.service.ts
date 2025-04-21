import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Cart } from "src/entities/cart.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
const JWT_SECRET = "your_jwt_secret";

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>
  ) {}

  // Getting All Data From Auth
  async getCartData(req: any) {
    try {
      // Fetch all users (excluding admin)
      const allCartData = await this.cartRepository.find();

      return {
        success: true,
        message: "All Cart Data",
        data: allCartData,
      };
    } catch (error) {
      console.error("Error fetching cart data:", error);
      return {
        success: false,
        message: "Failed to fetch cart data",
        error: error.message,
      };
    }
  }

  async getAllCartById(req: any) {
    try {
      // Fetch all users (excluding admin)
      const allCartData = await this.cartRepository.find({
        where: { userId: req?.user?.id },
      });

      return {
        success: true,
        message: "All Cart Data",
        data: allCartData,
      };
    } catch (error) {
      console.error("Error fetching cart data:", error);
      return {
        success: false,
        message: "Failed to fetch cart data",
        error: error.message,
      };
    }
  }

  // Post Cart Data
  async postCartData(request: any, data: any) {
    try {
      const check = await this.cartRepository.find({
        where: { productId: data?.productId, userId: request?.user?.id },
      });

      if (check.length !== 0) {
        return { success: false, message: "Product Already Exists" };
      } else {
        const cart = this.cartRepository.create({
          productTitle: data.productTitle,
          image: data.image,
          rating: data?.rating,
          price: data.price,
          quantity: data.quantity,
          subTotal: data.subTotal,
          productId: data.productId,
          brand: data.brand,
          userId: request?.user?.id,
        });

        // Saving Data in Database
        const result = await this.cartRepository.save(cart);

        return {
          success: true,
          message: "Product Added Successfully",
          data: { cart: result },
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

  async deleteCartData(req: any, id: any) {
    try {
      // Check if user exists
      const cartData = await this.cartRepository.find({
        where: { id: id, userId: req?.user?.id },
      });

      if (cartData.length === 0) {
        return { success: false, message: "Product Not Found" };
      } else {
        // Delete user
        await this.cartRepository.delete(cartData[0]?.id);
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

  async deleteAllCart(request: any) {
    try {
      const userId = request?.user?.id;

      if (!userId) {
        return { success: false, message: "Unauthorized user" };
      }

      await this.cartRepository.delete({ userId });

      return { success: true, message: "All Products Removed successfully" };
    } catch (error) {
      console.error("Error removing all products:", error);
      return {
        success: false,
        message: "Failed to remove all products",
        error: error.message,
      };
    }
  }

  async updateCart(request: any, id: any, data: any) {
    try {
      // Check if user exists
      const cartData = await this.cartRepository.find({
        where: { id: id, userId: request?.user?.id },
      });

      if (cartData.length === 0) {
        return { success: false, message: "Product not found" };
      } else {
        const newProduct = {
          productTitle: data.productTitle || cartData[0]?.productTitle,
          image: data.image || cartData[0]?.image,
          rating: data?.rating || cartData[0]?.rating,
          price: data.price || cartData[0]?.price,
          quantity: data.quantity || cartData[0]?.quantity,
          subTotal: data.subTotal || cartData[0]?.subTotal,
          productId: data.productId || cartData[0]?.productId,
          brand: data.brand || cartData[0]?.brand,
          userId: request?.user?.id,
        };

        const newUser = await this.cartRepository.update(id, newProduct);

        // Fetch updated user from DB

        return {
          success: true,
          message: "Product updated successfully",
          data: newUser,
        };
      }
    } catch (error) {
      console.error("Error updating user:", error);
      return {
        success: false,
        message: "Failed to update user",
        error: error.message,
      };
    }
  }
}
