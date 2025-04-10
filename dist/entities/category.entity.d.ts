import { Product } from "./product.entity";
import { SubCategory } from "./subCategory.entity";
export declare class Category {
    id: number;
    name: string;
    images: string[];
    color: string;
    product: Product[];
    subCategories: SubCategory[];
}
