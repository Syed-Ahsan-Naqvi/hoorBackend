import { StripeService } from "./stripe.service";
export declare class StripeController {
    private readonly stripeService;
    constructor(stripeService: StripeService);
    createSession(body: any): Promise<{
        url: string;
        id: string;
        session: import("stripe").Stripe.Response<import("stripe").Stripe.Checkout.Session>;
    }>;
    verifySession(body: {
        sessionId: string;
    }): Promise<{
        session: import("stripe").Stripe.Response<import("stripe").Stripe.Checkout.Session>;
        lineItems: import("stripe").Stripe.Response<import("stripe").Stripe.ApiList<import("stripe").Stripe.LineItem>>;
    }>;
}
