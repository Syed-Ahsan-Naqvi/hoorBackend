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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const category_entity_1 = require("../entities/category.entity");
const JWT_SECRET = "your_jwt_secret";
const cloudinary_1 = require("cloudinary");
const product_entity_1 = require("../entities/product.entity");
const cloudinary_service_1 = require("./cloudinary.service");
cloudinary_1.v2.config({
    cloud_name: "dbxuynhy0",
    api_key: "214768323283339",
    api_secret: "5IGw31yNn_50ZkimD8fG2Autrww",
});
let ProductService = class ProductService {
    constructor(productRepository, cloudinaryService) {
        this.productRepository = productRepository;
        this.cloudinaryService = cloudinaryService;
    }
    async getProductData() {
        const data = await this.productRepository.find({
            relations: ["category", "subCategory"],
        });
        return { message: "All Products", data: data };
    }
    async getProductByIdData(id) {
        const data = await this.productRepository.findOne({ where: { id } });
        return { message: "Product Data by ID", data: data };
    }
    async deleteProductByIdData(id) {
        const item = await this.productRepository.findOne({ where: { id } });
        if (!item) {
            throw new common_1.NotFoundException("Product not found");
        }
        if (item.images && item.images.length > 0) {
            await Promise.all(item.images.map((url) => this.cloudinaryService.deleteImage(url)));
        }
        const result = await this.productRepository.delete(id);
        return { message: "Data Deleted", data: result };
    }
    async postProductData(data, files) {
        try {
            const imageUrls = await Promise.all(files.map((file) => this.cloudinaryService.uploadImage(file)));
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
                isFeatured: JSON.parse(data.isFeatured) || false,
                category: data.category,
                subCategory: data.subCategory,
            };
            const result = await this.productRepository.save(finalData);
            return { message: "Product Data Added", success: true, result };
        }
        catch (error) {
            return {
                message: "Something went wrong!",
                success: false,
                error: error.message,
            };
        }
    }
    async removeImageFromItem(id, imageUrl) {
        const item = await this.productRepository.findOne({ where: { id } });
        item.images = item.images.filter((url) => url !== imageUrl);
        await this.cloudinaryService.deleteImage(imageUrl);
        await this.productRepository.update(id, {
            images: item.images,
        });
        return { message: "Product Updated Successfully", success: true };
    }
    async updateProductById(id, data, files) {
        const product = await this.productRepository.findOne({ where: { id } });
        if (!product) {
            throw new common_1.NotFoundException("Item not found");
        }
        let newImageUrls = [];
        if (files && files.length > 0) {
            newImageUrls = await Promise.all(files.map((file) => this.cloudinaryService.uploadImage(file)));
        }
        if (files && files.length > 0) {
            product.images.map((img) => {
                newImageUrls.push(img);
            });
        }
        else {
            newImageUrls = product.images;
        }
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
            isFeatured: JSON.parse(data.isFeatured) || product.isFeatured || false,
            category: data.category || product.category,
            subCategory: data.subCategory || product.subCategory,
        });
        return { message: "Product Updated Successfully", result };
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(0, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        cloudinary_service_1.CloudinaryService])
], ProductService);
//# sourceMappingURL=product.service.js.map