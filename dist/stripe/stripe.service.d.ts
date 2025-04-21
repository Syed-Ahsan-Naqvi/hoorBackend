import Stripe from "stripe";
export declare class StripeService {
    private stripe;
    createCheckoutSession(items: any[]): Promise<{
        url: string;
        id: string;
        session: Stripe.Response<Stripe.Checkout.Session>;
    }>;
    verifySession(sessionId: string): Promise<{
        session: Stripe.Response<Stripe.Checkout.Session>;
        lineItems: Stripe.Response<Stripe.ApiList<Stripe.LineItem>>;
    }>;
}
