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
exports.SubCategoryController = void 0;
const common_1 = require("@nestjs/common");
const subcategory_service_1 = require("./subcategory.service");
let SubCategoryController = class SubCategoryController {
    constructor(subcategoryService) {
        this.subcategoryService = subcategoryService;
    }
    async getSubCategoryData() {
        return this.subcategoryService.getSubCategoryData();
    }
    async getSubCategoryByIdData(id) {
        return this.subcategoryService.getSubCategoryByIdData(id.id);
    }
    async deleteSubCategoryByIdData(id) {
        return this.subcategoryService.deleteSubCategoryByIdData(id.id);
    }
    async postSubCategoryData(data) {
        console.log(data);
        return this.subcategoryService.postSubCategoryData(data);
    }
    async updateSubCategoryById(id, data) {
        return this.subcategoryService.updateSubCategoryById(id, data);
    }
};
exports.SubCategoryController = SubCategoryController;
__decorate([
    (0, common_1.Get)("/"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SubCategoryController.prototype, "getSubCategoryData", null);
__decorate([
    (0, common_1.Get)("/:id"),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SubCategoryController.prototype, "getSubCategoryByIdData", null);
__decorate([
    (0, common_1.Delete)("/:id"),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SubCategoryController.prototype, "deleteSubCategoryByIdData", null);
__decorate([
    (0, common_1.Post)("/"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SubCategoryController.prototype, "postSubCategoryData", null);
__decorate([
    (0, common_1.Put)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], SubCategoryController.prototype, "updateSubCategoryById", null);
exports.SubCategoryController = SubCategoryController = __decorate([
    (0, common_1.Controller)("/api/subcategory"),
    __metadata("design:paramtypes", [subcategory_service_1.SubCategoryService])
], SubCategoryController);
//# sourceMappingURL=subcategory.controller.js.map