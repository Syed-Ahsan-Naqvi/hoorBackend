import { Injectable } from "@nestjs/common";
import Stripe from "stripe";
import * as dotenv from "dotenv";

dotenv.config(); // Load environment variables

@Injectable()
export class StripeService {
  private stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`, {
    apiVersion: "2025-03-31.basil",
  });

  async createCheckoutSession(items: any[]) {
    // const line_items = items.map((item) => ({
    //   price_data: {
    //     currency: "pkr", // for Pakistan
    //     product_data: {
    //       name: item.productTitle,
    //       images: [item.image],
    //     },
    //     unit_amount: item.price * 100, // Stripe expects paisa
    //   },
    //   quantity: item.quantity,
    // }));
    // const session = await this.stripe.checkout.sessions.create({
    //   payment_method_types: ["card"],
    //   mode: "payment",
    //   line_items,
    //   success_url: "https://hoorstudio.netlify.app/success",
    //   cancel_url: "https://hoorstudio.netlify.app/cancel",
    // });
    // // return { url: session.url, id: session.id };
    // return { id: session.id };
  }
}
