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
exports.CategoryController = void 0;
const common_1 = require("@nestjs/common");
const category_service_1 = require("./category.service");
const Category_dto_1 = require("../dtos/Category.dto");
const platform_express_1 = require("@nestjs/platform-express");
const cloudinary_service_1 = require("./cloudinary.service");
let CategoryController = class CategoryController {
    constructor(categoryService, cloudinaryService) {
        this.categoryService = categoryService;
        this.cloudinaryService = cloudinaryService;
    }
    async getCategoryData() {
        return this.categoryService.getCategoryData();
    }
    async getCategoryByIdData(id) {
        return this.categoryService.getCategoryByIdData(id.id);
    }
    async deleteCategoryByIdData(id) {
        return this.categoryService.deleteCategoryByIdData(id.id);
    }
    async deleteImage(id, data) {
        await this.categoryService.removeImageFromItem(id, data.url);
    }
    async postCategoryData(data, files) {
        return this.categoryService.postCategoryData(data, files);
    }
    async updateItem(id, data, files) {
        return this.categoryService.updateCategoryById(id, data, files);
    }
};
exports.CategoryController = CategoryController;
__decorate([
    (0, common_1.Get)("/"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "getCategoryData", null);
__decorate([
    (0, common_1.Get)("/:id"),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "getCategoryByIdData", null);
__decorate([
    (0, common_1.Delete)("/:id"),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "deleteCategoryByIdData", null);
__decorate([
    (0, common_1.Delete)("/:id/images"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "deleteImage", null);
__decorate([
    (0, common_1.Post)("/createCategory"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)("images")),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Category_dto_1.CreateCategoryDto, Array]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "postCategoryData", null);
__decorate([
    (0, common_1.Put)(":id"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)("images")),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Array]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "updateItem", null);
exports.CategoryController = CategoryController = __decorate([
    (0, common_1.Controller)("/api/category"),
    __metadata("design:paramtypes", [category_service_1.CategoryService,
        cloudinary_service_1.CloudinaryService])
], CategoryController);
//# sourceMappingURL=category.controller.js.map