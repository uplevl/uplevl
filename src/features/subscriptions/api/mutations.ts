"use server";

import Stripe from "stripe";

import { env } from "@/lib/env/server";

import { type PriceTag, priceTags } from "@/features/subscriptions/constants";
import { verifySession } from "@/features/user/api/queries";

const stripeClient = new Stripe(env.STRIPE_SECRET_KEY, {
  typescript: true,
});

interface CreateStripeSessionVariables {
  priceTag: PriceTag;
  pathname: string;
}

export async function createStripeSession(variables: CreateStripeSessionVariables): Promise<string> {
  try {
    const { priceTag, pathname } = variables;

    await verifySession();
    const { url } = await stripeClient.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [
        {
          price: priceTags[priceTag],
          quantity: 1,
        },
      ],
      metadata: {
        price_tag: priceTag,
      },
      success_url: `${env.PUBLIC_URL}${pathname}?subscription=success`,
      cancel_url: `${env.PUBLIC_URL}${pathname}?subscription=cancel`,
    });

    if (!url) {
      throw new Error("No URL returned from Stripe");
    }

    return url;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error("Failed to create Stripe session");
  }
}
