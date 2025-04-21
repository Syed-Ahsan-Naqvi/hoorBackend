import { Cart } from "src/entities/cart.entity";
import { Repository } from "typeorm";
export declare class CartService {
    private cartRepository;
    constructor(cartRepository: Repository<Cart>);
    getCartData(req: any): Promise<{
        success: boolean;
        message: string;
        data: Cart[];
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
    getAllCartById(req: any): Promise<{
        success: boolean;
        message: string;
        data: Cart[];
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
            cart: Cart;
        };
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
    deleteCartData(req: any, id: any): Promise<{
        success: boolean;
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
    }>;
    deleteAllCart(request: any): Promise<{
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
