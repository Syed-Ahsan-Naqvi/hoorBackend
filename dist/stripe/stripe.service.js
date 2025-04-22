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
const dotenv = require("dotenv");
dotenv.config();
let StripeService = class StripeService {
    constructor() {
        this.stripe = new stripe_1.default(`${process.env.STRIPE_SECRET_KEY}`, {
            apiVersion: "2025-03-31.basil",
        });
    }
    async createCheckoutSession(items) {
        console.log("Response Data", items);
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
            success_url: `https://hoorstudio.netlify.app/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: "https://hoorstudio.netlify.app/cancel",
            billing_address_collection: "required",
        });
        return { url: session.url, id: session.id, session: session };
    }
    async verifySession(sessionId) {
        const session = await this.stripe.checkout.sessions.retrieve(sessionId);
        const lineItems = await this.stripe.checkout.sessions.listLineItems(sessionId, {
            expand: ["data.price.product"],
        });
        return {
            session,
            lineItems,
        };
    }
};
exports.StripeService = StripeService;
exports.StripeService = StripeService = __decorate([
    (0, common_1.Injectable)()
], StripeService);
//# sourceMappingURL=stripe.service.js.map