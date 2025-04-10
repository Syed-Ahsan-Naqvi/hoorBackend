import { ProductService } from "./product.service";
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    getProductData(): Promise<{
        message: string;
        data: import("../entities/product.entity").Product[];
    }>;
    getProductByIdData(id: any): Promise<{
        message: string;
        data: import("../entities/product.entity").Product;
    }>;
    deleteProductByIdData(id: any): Promise<{
        message: string;
        data: import("typeorm").DeleteResult;
    }>;
    deleteImage(id: number, data: any): Promise<void>;
    postProductData(data: any, files: Express.Multer.File[]): Promise<{
        message: string;
        success: boolean;
        result: {
            name: any;
            description: any;
            images: string[];
            brand: any;
            discount: any;
            price: any;
            oldPrice: any;
            countInStock: any;
            rating: any;
            isFeatured: any;
            category: any;
            subCategory: any;
        } & import("../entities/product.entity").Product;
        error?: undefined;
    } | {
        message: string;
        success: boolean;
        error: any;
        result?: undefined;
    }>;
    updateProductById(id: number, data: any, files?: Express.Multer.File[]): Promise<{
        message: string;
        result: import("typeorm").UpdateResult;
    }>;
}
