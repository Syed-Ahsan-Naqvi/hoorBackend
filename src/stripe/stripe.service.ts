// src/stripe/stripe.service.ts
import { Injectable } from "@nestjs/common";
import Stripe from "stripe";
// import * as dotenv from "dotenv";
// dotenv.config();

@Injectable()
export class StripeService {
  private stripe = new Stripe(
    "sk_test_51IIsbbByuPN8Gt69X3jzcru13eb0JyoHX8fWAfejgZnUuN3OveRen3z9u6dztILNFMva60RrVy7Ck7R7Chn4HGsa006Tf84W1L",
    {
      // Remove apiVersion to fix the error
    }
  );

  async createCheckoutSession(items: any[]) {
    const line_items = items.map((item) => ({
      price_data: {
        currency: "pkr", // for Pakistan
        product_data: {
          name: item.productTitle,
          images: [item.image],
        },
        unit_amount: item.price * 100, // Stripe expects paisa
      },
      quantity: item.quantity,
    }));

    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      success_url: "https://hoorstudio.netlify.app//success",
      cancel_url: "https://hoorstudio.netlify.app//cancel",
    });

    return { url: session.url, id: session.id };
  }
}
