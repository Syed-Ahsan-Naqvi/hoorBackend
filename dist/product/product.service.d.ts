import { Repository } from "typeorm";
import { Product } from "src/entities/product.entity";
import { CloudinaryService } from "src/product/cloudinary.service";
export declare class ProductService {
    private productRepository;
    private readonly cloudinaryService;
    constructor(productRepository: Repository<Product>, cloudinaryService: CloudinaryService);
    getProductData(): Promise<{
        message: string;
        data: Product[];
    }>;
    getProductByIdData(id: any): Promise<{
        message: string;
        data: Product;
    }>;
    deleteProductByIdData(id: any): Promise<{
        message: string;
        data: import("typeorm").DeleteResult;
    }>;
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
        } & Product;
        error?: undefined;
    } | {
        message: string;
        success: boolean;
        error: any;
        result?: undefined;
    }>;
    removeImageFromItem(id: number, imageUrl: string): Promise<{
        message: string;
        success: boolean;
    }>;
    updateProductById(id: number, data: any, files: Express.Multer.File[]): Promise<{
        message: string;
        result: import("typeorm").UpdateResult;
    }>;
}
