"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const category_entity_1 = require("./entities/category.entity");
const category_module_1 = require("./category/category.module");
const product_entity_1 = require("./entities/product.entity");
const product_module_1 = require("./product/product.module");
const cart_module_1 = require("./cart/cart.module");
const subCategory_entity_1 = require("./entities/subCategory.entity");
const auth_module_1 = require("./auth/auth.module");
const auth_entity_1 = require("./entities/auth.entity");
const cart_entity_1 = require("./entities/cart.entity");
const wish_entity_1 = require("./entities/wish.entity");
const wish_module_1 = require("./wishlist/wish.module");
const stripe_module_1 = require("./stripe/stripe.module");
const order_module_1 = require("./order/order.module");
const order_entity_1 = require("./entities/order.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: "mysql",
                host: "crossover.proxy.rlwy.net",
                port: 26567,
                username: "root",
                password: "lNIbqinetCjKvTVHZYhBAeGttsvUFThc",
                database: "railway",
                entities: [category_entity_1.Category, product_entity_1.Product, subCategory_entity_1.SubCategory, auth_entity_1.User, cart_entity_1.Cart, wish_entity_1.Wish, order_entity_1.Order],
                synchronize: true,
            }),
            auth_module_1.AuthModule,
            category_module_1.CategoryModule,
            product_module_1.ProductModule,
            cart_module_1.CartModule,
            wish_module_1.WishModule,
            stripe_module_1.StripeModule,
            order_module_1.OrderModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map