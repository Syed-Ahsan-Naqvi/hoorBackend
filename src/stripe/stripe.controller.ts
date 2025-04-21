// src/stripe/stripe.controller.ts
import { Controller, Post, Body } from "@nestjs/common";
import { StripeService } from "./stripe.service";

@Controller("api/stripe")
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post("create-checkout-session")
  async createSession(@Body() body: any) {
    return this.stripeService.createCheckoutSession(body);
  }

  @Post("verify-session")
  async verifySession(@Body() body: { sessionId: string }) {
    return this.stripeService.verifySession(body.sessionId);
  }
}
