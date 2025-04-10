"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryModule = void 0;
const common_1 = require("@nestjs/common");
const category_controller_1 = require("./category.controller");
const category_service_1 = require("./category.service");
const typeorm_1 = require("@nestjs/typeorm");
const cloudinary_service_1 = require("./cloudinary.service");
const category_entity_1 = require("../entities/category.entity");
const subCategory_entity_1 = require("../entities/subCategory.entity");
const subcategory_controller_1 = require("../subcategory/subcategory.controller");
const subcategory_service_1 = require("../subcategory/subcategory.service");
let CategoryModule = class CategoryModule {
};
exports.CategoryModule = CategoryModule;
exports.CategoryModule = CategoryModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([category_entity_1.Category, subCategory_entity_1.SubCategory])],
        controllers: [category_controller_1.CategoryController, subcategory_controller_1.SubCategoryController],
        providers: [category_service_1.CategoryService, subcategory_service_1.SubCategoryService, cloudinary_service_1.CloudinaryService],
    })
], CategoryModule);
//# sourceMappingURL=category.module.js.map