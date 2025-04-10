import { CartService } from "src/cart/cart.service";
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    getCartData(request: any): Promise<{
        success: boolean;
        message: string;
        data: import("../entities/cart.entity").Cart[];
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
    getAllCartById(request: any): Promise<{
        success: boolean;
        message: string;
        data: import("../entities/cart.entity").Cart[];
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
    postCartData(request: any, data: any): Promise<{
        success: boolean;
        message: string;
        data?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        data: {
            cart: import("../entities/cart.entity").Cart;
        };
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
    deleteCartData(request: any, id: number): Promise<{
        success: boolean;
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
    }>;
    updateCart(request: any, id: any, data: any): Promise<{
        success: boolean;
        message: string;
        data?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        data: import("typeorm").UpdateResult;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
}
