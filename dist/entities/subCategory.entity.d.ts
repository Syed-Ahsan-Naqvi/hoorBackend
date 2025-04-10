import { Category } from "./category.entity";
import { Product } from "./product.entity";
export declare class SubCategory {
    id: number;
    name: string;
    category: Category;
    products: Product[];
}
