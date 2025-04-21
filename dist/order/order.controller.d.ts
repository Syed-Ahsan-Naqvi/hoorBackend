import { OrderService } from "./order.service";
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    getAllOrdersData(req: any): Promise<{
        success: boolean;
        message: string;
        data: import("../entities/order.entity").Order[];
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
    createOrder(req: any, body: any): Promise<{
        success: boolean;
        message: string;
        data: import("../entities/order.entity").Order;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
}
