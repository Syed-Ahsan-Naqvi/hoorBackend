import { WishService } from "src/wishlist/wish.service";
export declare class WishController {
    private readonly wishService;
    constructor(wishService: WishService);
    getWishList(request: any): Promise<{
        success: boolean;
        message: string;
        data: import("../entities/wish.entity").Wish[];
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
    getWishListById(request: any): Promise<{
        success: boolean;
        message: string;
        data: import("../entities/wish.entity").Wish[];
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
        data: import("../entities/wish.entity").Wish;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
    deleteWishData(request: any, id: number): Promise<{
        success: boolean;
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
    }>;
}
