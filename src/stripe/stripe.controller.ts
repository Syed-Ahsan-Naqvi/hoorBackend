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
}
