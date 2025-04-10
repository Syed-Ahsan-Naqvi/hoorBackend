import { SubCategoryService } from "./subcategory.service";
export declare class SubCategoryController {
    private readonly subcategoryService;
    constructor(subcategoryService: SubCategoryService);
    getSubCategoryData(): Promise<{
        message: string;
        data: import("../entities/subCategory.entity").SubCategory[];
    }>;
    getSubCategoryByIdData(id: any): Promise<{
        message: string;
        data: import("../entities/subCategory.entity").SubCategory;
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
        } & import("../entities/subCategory.entity").SubCategory;
    }>;
    updateSubCategoryById(id: number, data: any): Promise<{
        message: string;
        result: import("typeorm").UpdateResult;
    }>;
}
