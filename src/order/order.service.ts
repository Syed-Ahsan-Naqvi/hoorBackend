import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "src/entities/order.entity";
import { Repository } from "typeorm";
import { Raw } from "typeorm";

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>
  ) {}

  async getAllOrdersData(req: any) {
    try {
      const userId = req.user?.id;

      // Check if user is admin
      const userRole = req.user?.role;
      if (userRole === "admin") {
        // Fetch all orders
        const allOrders = await this.orderRepository.find();
        return {
          success: true,
          message: "All Orders List",
          data: allOrders,
        };
      }
      // Fetch all orders

      const userOrders = await this.orderRepository.find({
        where: {
          userId: Raw(
            (alias) =>
              `JSON_UNQUOTE(JSON_EXTRACT(${alias}, '$.id')) = '${userId}'`
          ),
        },
      });

      return {
        success: true,
        message: "User's Orders List",
        data: userOrders,
      };
    } catch (error) {
      console.error("Error fetching user's orders:", error);
      return {
        success: false,
        message: "Failed to fetch user's orders",
        error: error.message,
      };
    }
  }

  async createOrder(req: any, body: any) {
    try {
      const order = this.orderRepository.create({
        amount_total: body?.amount_total,
        // expires_at: body?.expires_at,
        // invoice_id: body?.invoice_id,
        card_holder_name: body?.card_holder_name,
        card_holder_email: body?.card_holder_email,
        card_holder_phone: body?.card_holder_phone,
        card_holder_city: body?.card_holder_city,
        card_holder_country: body?.card_holder_country,
        card_holder_line1: body?.card_holder_line1,
        card_holder_line2: body?.card_holder_line2,
        card_holder_postal_code: body?.card_holder_postal_code,
        // customer_state: body?.customer_state,
        payment_id: body?.payment_id,
        payment_status: body?.payment_status,
        // currency: body?.currency,
        order_data: body?.order_data,
        userId: req?.user,
      });

      const result = await this.orderRepository.save(order);

      return {
        success: true,
        message: "Order Added",
        data: result,
      };
    } catch (error) {
      return {
        success: false,
        message: "Failed to Add Order",
        error: error.message,
      };
    }
  }
}
