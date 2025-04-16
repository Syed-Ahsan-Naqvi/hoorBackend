import { StripeService } from "./stripe.service";
export declare class StripeController {
    private readonly stripeService;
    constructor(stripeService: StripeService);
    createSession(body: any): Promise<void>;
}
