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
    console.log("Response Data", items);
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
      success_url: `https://hoorstudio.netlify.app/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: "https://hoorstudio.netlify.app/cancel",
      // success_url: `http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}`,
      // cancel_url: "http://localhost:3000/cancel",
      billing_address_collection: "required", // This forces Stripe to ask for the billing address
    });

    return { url: session.url, id: session.id, session: session };
  }

  async verifySession(sessionId: string) {
    // Step 1: Retrieve the session (basic details)
    const session = await this.stripe.checkout.sessions.retrieve(sessionId);

    // Step 2: Retrieve line items separately & expand product
    const lineItems = await this.stripe.checkout.sessions.listLineItems(
      sessionId,
      {
        expand: ["data.price.product"], // This is necessary to get product name & images
      }
    );

    return {
      session,
      lineItems,
    };
  }
}
