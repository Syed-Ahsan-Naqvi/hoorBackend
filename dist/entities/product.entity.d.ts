import { Category } from "./category.entity";
import { SubCategory } from "./subCategory.entity";
export declare class Product {
    id: number;
    name: string;
    description: string;
    images: string[];
    brand: string;
    discount: string;
    price: number;
    oldPrice: number;
    countInStock: number;
    rating: number;
    numReviews: number;
    isFeatured: boolean;
    dateCreated: Date;
    category: Category;
    subCategory: SubCategory;
}
