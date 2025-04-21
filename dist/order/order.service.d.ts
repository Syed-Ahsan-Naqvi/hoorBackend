import { Order } from "src/entities/order.entity";
import { Repository } from "typeorm";
export declare class OrderService {
    private orderRepository;
    constructor(orderRepository: Repository<Order>);
    getAllOrdersData(req: any): Promise<{
        success: boolean;
        message: string;
        data: Order[];
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
        data: Order;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
}
