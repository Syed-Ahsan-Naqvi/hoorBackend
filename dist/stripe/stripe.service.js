"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripeService = void 0;
const common_1 = require("@nestjs/common");
const stripe_1 = require("stripe");
let StripeService = class StripeService {
    constructor() {
        this.stripe = new stripe_1.default("sk_test_51IIsbbByuPN8Gt69X3jzcru13eb0JyoHX8fWAfejgZnUuN3OveRen3z9u6dztILNFMva60RrVy7Ck7R7Chn4HGsa006Tf84W1L", {});
    }
    async createCheckoutSession(items) {
        const line_items = items.map((item) => ({
            price_data: {
                currency: "pkr",
                product_data: {
                    name: item.productTitle,
                    images: [item.image],
                },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity,
        }));
        const session = await this.stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items,
            success_url: "https://hoorstudio.netlify.app/success",
            cancel_url: "https://hoorstudio.netlify.app/cancel",
        });
        return { id: session.id };
    }
};
exports.StripeService = StripeService;
exports.StripeService = StripeService = __decorate([
    (0, common_1.Injectable)()
], StripeService);
//# sourceMappingURL=stripe.service.js.map