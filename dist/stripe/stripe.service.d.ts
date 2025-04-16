export declare class StripeService {
    private stripe;
    createCheckoutSession(items: any[]): Promise<{
        id: string;
    }>;
}
