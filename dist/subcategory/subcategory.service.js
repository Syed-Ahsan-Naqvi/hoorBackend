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
exports.SubCategoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const subCategory_entity_1 = require("../entities/subCategory.entity");
let SubCategoryService = class SubCategoryService {
    constructor(subcategoryRepository) {
        this.subcategoryRepository = subcategoryRepository;
    }
    async getSubCategoryData() {
        const data = await this.subcategoryRepository.find({
            relations: ["category"],
        });
        return { message: "All Data From Category", data: data };
    }
    async getSubCategoryByIdData(id) {
        const data = await this.subcategoryRepository.findOne({ where: { id } });
        return { message: "All Data From Category", data: data };
    }
    async deleteSubCategoryByIdData(id) {
        const item = await this.subcategoryRepository.findOne({ where: { id } });
        if (!item) {
            throw new common_1.NotFoundException("Item not found");
        }
        const result = await this.subcategoryRepository.delete(id);
        return { message: "Data Deleted", data: result };
    }
    async postSubCategoryData(data) {
        const finalData = {
            name: data.name,
            category: data.category,
        };
        const result = await this.subcategoryRepository.save(finalData);
        return { message: "Category Data Added", result };
    }
    async updateSubCategoryById(id, data) {
        const category = await this.subcategoryRepository.findOne({
            where: { id },
        });
        if (!category) {
            throw new common_1.NotFoundException("Item not found");
        }
        const result = await this.subcategoryRepository.update(id, {
            name: data.name,
            category: data.category,
        });
        return { message: "Category Updated Successfully", result };
    }
};
exports.SubCategoryService = SubCategoryService;
exports.SubCategoryService = SubCategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(subCategory_entity_1.SubCategory)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SubCategoryService);
//# sourceMappingURL=subcategory.service.js.map