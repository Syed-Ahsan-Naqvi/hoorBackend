"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const order_entity_1 = require("../entities/order.entity");
const typeorm_2 = require("typeorm");
const typeorm_3 = require("typeorm");
let OrderService = class OrderService {
    constructor(orderRepository) {
        this.orderRepository = orderRepository;
    }
    async getAllOrdersData(req) {
        try {
            const userId = req.user?.id;
            const userOrders = await this.orderRepository.find({
                where: {
                    userId: (0, typeorm_3.Raw)((alias) => `JSON_UNQUOTE(JSON_EXTRACT(${alias}, '$.id')) = '${userId}'`),
                },
            });
            console.log(userOrders);
            return {
                success: true,
                message: "User's Orders List",
                data: userOrders,
            };
        }
        catch (error) {
            console.error("Error fetching user's orders:", error);
            return {
                success: false,
                message: "Failed to fetch user's orders",
                error: error.message,
            };
        }
    }
    async createOrder(req, body) {
        try {
            const order = this.orderRepository.create({
                amount_total: body?.amount_total,
                card_holder_name: body?.card_holder_name,
                card_holder_email: body?.card_holder_email,
                card_holder_phone: body?.card_holder_phone,
                card_holder_city: body?.card_holder_city,
                card_holder_country: body?.card_holder_country,
                card_holder_line1: body?.card_holder_line1,
                card_holder_line2: body?.card_holder_line2,
                card_holder_postal_code: body?.card_holder_postal_code,
                payment_id: body?.payment_id,
                payment_status: body?.payment_status,
                order_data: body?.order_data,
                userId: req?.user,
            });
            const result = await this.orderRepository.save(order);
            return {
                success: true,
                message: "Order Added",
                data: result,
            };
        }
        catch (error) {
            return {
                success: false,
                message: "Failed to Add Order",
                error: error.message,
            };
        }
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], OrderService);
//# sourceMappingURL=order.service.js.map