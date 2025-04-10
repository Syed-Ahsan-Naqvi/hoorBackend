import { Repository } from "typeorm";
import { Category } from "src/entities/category.entity";
import { CloudinaryService } from "./cloudinary.service";
export declare class CategoryService {
    private categoryRepository;
    private readonly cloudinaryService;
    constructor(categoryRepository: Repository<Category>, cloudinaryService: CloudinaryService);
    getCategoryData(): Promise<{
        message: string;
        data: Category[];
    }>;
    getCategoryByIdData(id: any): Promise<{
        message: string;
        data: Category;
    }>;
    deleteCategoryByIdData(id: any): Promise<{
        message: string;
        data: import("typeorm").DeleteResult;
    }>;
    postCategoryData(data: any, files: Express.Multer.File[]): Promise<{
        message: string;
        result: {
            name: any;
            images: string[];
            color: any;
        } & Category;
    }>;
    removeImageFromItem(id: number, imageUrl: string): Promise<import("typeorm").UpdateResult>;
    updateCategoryById(id: number, data: any, files: Express.Multer.File[]): Promise<{
        message: string;
        result: import("typeorm").UpdateResult;
    }>;
}
