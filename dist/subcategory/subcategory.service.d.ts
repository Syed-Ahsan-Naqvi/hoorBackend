import { Repository } from "typeorm";
import { SubCategory } from "src/entities/subCategory.entity";
export declare class SubCategoryService {
    private subcategoryRepository;
    constructor(subcategoryRepository: Repository<SubCategory>);
    getSubCategoryData(): Promise<{
        message: string;
        data: SubCategory[];
    }>;
    getSubCategoryByIdData(id: any): Promise<{
        message: string;
        data: SubCategory;
    }>;
    deleteSubCategoryByIdData(id: any): Promise<{
        message: string;
        data: import("typeorm").DeleteResult;
    }>;
    postSubCategoryData(data: any): Promise<{
        message: string;
        result: {
            name: any;
            category: any;
        } & SubCategory;
    }>;
    updateSubCategoryById(id: number, data: any): Promise<{
        message: string;
        result: import("typeorm").UpdateResult;
    }>;
}
