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
exports.WishService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const wish_entity_1 = require("../entities/wish.entity");
const JWT_SECRET = "your_jwt_secret";
let WishService = class WishService {
    constructor(wishRepository) {
        this.wishRepository = wishRepository;
    }
    async getWishList(req) {
        try {
            const allWishList = await this.wishRepository.find();
            return {
                success: true,
                message: "All Wish List",
                data: allWishList,
            };
        }
        catch (error) {
            console.error("Error fetching wish list:", error);
            return {
                success: false,
                message: "Failed to fetch wish list",
                error: error.message,
            };
        }
    }
    async getWishListById(req) {
        try {
            const wishList = await this.wishRepository.find({
                where: { userId: req?.user?.id },
            });
            return {
                success: true,
                message: "All Wish List",
                data: wishList,
            };
        }
        catch (error) {
            console.error("Error fetching Wish List:", error);
            return {
                success: false,
                message: "Failed to fetch wish list",
                error: error.message,
            };
        }
    }
    async postWishList(request, data) {
        console.log(data);
        try {
            const check = await this.wishRepository.find({
                where: { productId: data?.productId, userId: request?.user?.id },
            });
            if (check.length !== 0) {
                return { success: false, message: "Product Already Exists" };
            }
            else {
                const wish = this.wishRepository.create({
                    productTitle: data?.productTitle,
                    image: data?.image,
                    rating: data?.rating,
                    price: data?.price,
                    brand: data?.brand,
                    productId: data?.productId,
                    userId: request?.user?.id,
                });
                const result = await this.wishRepository.save(wish);
                return {
                    success: true,
                    message: "Product Added To Wish List",
                    data: result,
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
    async deleteWishData(req, id) {
        try {
            const cartData = await this.wishRepository.find({
                where: { productId: id, userId: req?.user?.id },
            });
            if (cartData.length === 0) {
                return { success: false, message: "Product Not Found" };
            }
            else {
                await this.wishRepository.delete(cartData[0]?.id);
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
};
exports.WishService = WishService;
exports.WishService = WishService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(wish_entity_1.Wish)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], WishService);
//# sourceMappingURL=wish.service.js.map