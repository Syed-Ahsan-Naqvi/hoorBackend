"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const cart_entity_1 = require("../entities/cart.entity");
const typeorm_2 = require("typeorm");
const JWT_SECRET = "your_jwt_secret";
let CartService = class CartService {
    constructor(cartRepository) {
        this.cartRepository = cartRepository;
    }
    async getCartData(req) {
        try {
            const allCartData = await this.cartRepository.find();
            return {
                success: true,
                message: "All Cart Data",
                data: allCartData,
            };
        }
        catch (error) {
            console.error("Error fetching cart data:", error);
            return {
                success: false,
                message: "Failed to fetch cart data",
                error: error.message,
            };
        }
    }
    async getAllCartById(req) {
        try {
            const allCartData = await this.cartRepository.find({
                where: { userId: req?.user?.id },
            });
            return {
                success: true,
                message: "All Cart Data",
                data: allCartData,
            };
        }
        catch (error) {
            console.error("Error fetching cart data:", error);
            return {
                success: false,
                message: "Failed to fetch cart data",
                error: error.message,
            };
        }
    }
    async postCartData(request, data) {
        try {
            const check = await this.cartRepository.find({
                where: { productId: data?.productId, userId: request?.user?.id },
            });
            if (check.length !== 0) {
                return { success: false, message: "Product Already Exists" };
            }
            else {
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
                const result = await this.cartRepository.save(cart);
                return {
                    success: true,
                    message: "Product Added Successfully",
                    data: { cart: result },
                };
            }
        }
        catch (error) {
            return {
                success: false,
                message: "Failed to Add Product",
                error: error.message,
            };
        }
    }
    async deleteCartData(req, id) {
        try {
            const cartData = await this.cartRepository.find({
                where: { id: id, userId: req?.user?.id },
            });
            if (cartData.length === 0) {
                return { success: false, message: "Product Not Found" };
            }
            else {
                await this.cartRepository.delete(cartData[0]?.id);
                return { success: true, message: "Product Removed successfully" };
            }
        }
        catch (error) {
            console.error("Error removing product:", error);
            return {
                success: false,
                message: "Failed to remove product",
                error: error.message,
            };
        }
    }
    async updateCart(request, id, data) {
        try {
            const cartData = await this.cartRepository.find({
                where: { id: id, userId: request?.user?.id },
            });
            if (cartData.length === 0) {
                return { success: false, message: "Product not found" };
            }
            else {
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
                return {
                    success: true,
                    message: "Product updated successfully",
                    data: newUser,
                };
            }
        }
        catch (error) {
            console.error("Error updating user:", error);
            return {
                success: false,
                message: "Failed to update user",
                error: error.message,
            };
        }
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(cart_entity_1.Cart)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CartService);
//# sourceMappingURL=cart.service.js.map