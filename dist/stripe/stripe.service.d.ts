export declare class StripeService {
    private stripe;
    createCheckoutSession(items: any[]): Promise<{
        url: string;
        id: string;
    }>;
}
