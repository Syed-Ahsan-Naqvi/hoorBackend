import { Repository } from "typeorm";
import { Wish } from "src/entities/wish.entity";
export declare class WishService {
    private wishRepository;
    constructor(wishRepository: Repository<Wish>);
    getWishList(req: any): Promise<{
        success: boolean;
        message: string;
        data: Wish[];
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
    getWishListById(req: any): Promise<{
        success: boolean;
        message: string;
        data: Wish[];
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
    postWishList(request: any, data: any): Promise<{
        success: boolean;
        message: string;
        data?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        data: Wish;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
    deleteWishData(req: any, id: any): Promise<{
        success: boolean;
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
    }>;
}
