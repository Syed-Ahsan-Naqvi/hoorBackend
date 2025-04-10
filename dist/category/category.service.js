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
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const category_entity_1 = require("../entities/category.entity");
const JWT_SECRET = "your_jwt_secret";
const cloudinary_1 = require("cloudinary");
const cloudinary_service_1 = require("./cloudinary.service");
cloudinary_1.v2.config({
    cloud_name: "dbxuynhy0",
    api_key: "214768323283339",
    api_secret: "5IGw31yNn_50ZkimD8fG2Autrww",
});
let CategoryService = class CategoryService {
    constructor(categoryRepository, cloudinaryService) {
        this.categoryRepository = categoryRepository;
        this.cloudinaryService = cloudinaryService;
    }
    async getCategoryData() {
        const data = await this.categoryRepository.find();
        return { message: "All Data From Category", data: data };
    }
    async getCategoryByIdData(id) {
        const data = await this.categoryRepository.findOne({ where: { id } });
        return { message: "All Data From Category", data: data };
    }
    async deleteCategoryByIdData(id) {
        const item = await this.categoryRepository.findOne({ where: { id } });
        if (!item) {
            throw new common_1.NotFoundException("Item not found");
        }
        if (item.images && item.images.length > 0) {
            await Promise.all(item.images.map((url) => this.cloudinaryService.deleteImage(url)));
        }
        const result = await this.categoryRepository.delete(id);
        return { message: "Data Deleted", data: result };
    }
    async postCategoryData(data, files) {
        const imageUrls = await Promise.all(files.map((file) => this.cloudinaryService.uploadImage(file)));
        const finalData = {
            name: data.name,
            images: imageUrls,
            color: data.color,
        };
        const result = await this.categoryRepository.save(finalData);
        return { message: "Category Data Added", result };
    }
    async removeImageFromItem(id, imageUrl) {
        const item = await this.categoryRepository.findOne({ where: { id } });
        item.images = item.images.filter((url) => url !== imageUrl);
        await this.cloudinaryService.deleteImage(imageUrl);
        return this.categoryRepository.update(id, {
            images: item.images,
        });
    }
    async updateCategoryById(id, data, files) {
        const category = await this.categoryRepository.findOne({ where: { id } });
        if (!category) {
            throw new common_1.NotFoundException("Item not found");
        }
        let newImageUrls = [];
        if (files && files.length > 0) {
            newImageUrls = await Promise.all(files.map((file) => this.cloudinaryService.uploadImage(file)));
        }
        if (files && files.length > 0) {
            category.images.map((img) => {
                newImageUrls.push(img);
            });
        }
        else {
            newImageUrls = category.images;
        }
        const result = await this.categoryRepository.update(id, {
            name: data.name,
            images: newImageUrls,
            color: data.color,
        });
        return { message: "Category Updated Successfully", result };
    }
};
exports.CategoryService = CategoryService;
exports.CategoryService = CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        cloudinary_service_1.CloudinaryService])
], CategoryService);
//# sourceMappingURL=category.service.js.map