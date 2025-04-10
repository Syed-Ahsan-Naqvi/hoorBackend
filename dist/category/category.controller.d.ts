import { CategoryService } from "./category.service";
import { CreateCategoryDto } from "src/dtos/Category.dto";
import { CloudinaryService } from "src/category/cloudinary.service";
export declare class CategoryController {
    private readonly categoryService;
    private readonly cloudinaryService;
    constructor(categoryService: CategoryService, cloudinaryService: CloudinaryService);
    getCategoryData(): Promise<{
        message: string;
        data: import("../entities/category.entity").Category[];
    }>;
    getCategoryByIdData(id: any): Promise<{
        message: string;
        data: import("../entities/category.entity").Category;
    }>;
    deleteCategoryByIdData(id: any): Promise<{
        message: string;
        data: import("typeorm").DeleteResult;
    }>;
    deleteImage(id: number, data: any): Promise<void>;
    postCategoryData(data: CreateCategoryDto, files: Express.Multer.File[]): Promise<{
        message: string;
        result: {
            name: any;
            images: string[];
            color: any;
        } & import("../entities/category.entity").Category;
    }>;
    updateItem(id: number, data: any, files?: Express.Multer.File[]): Promise<{
        message: string;
        result: import("typeorm").UpdateResult;
    }>;
}
