import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";

import { env } from "@/lib/env/server";
import { stripe } from "@/lib/stripe";

interface StripeWebhookResponse {
  error: string | null;
  data: unknown | null;
}

async function handleWebhookError(error: Error, status = 400): Promise<NextResponse> {
  return NextResponse.json({ error: error.message, data: null } satisfies StripeWebhookResponse, { status });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = (await headers()).get("Stripe-Signature");

    const event = await validateStripeSignature(body, signature);
    const stripeSession = validateCheckoutSession(event);

    // TODO: Implement your business logic here
    // const customerId = stripeSession.customer as string;
    // const customerEmail = stripeSession.customer_details?.email as string;
    // const priceTag = stripeSession.metadata?.price_tag as PriceTag;

    return NextResponse.json({ error: null, data: stripeSession } satisfies StripeWebhookResponse, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return handleWebhookError(error);
    }
    return handleWebhookError(new Error("Unknown error occurred"));
  }
}

async function validateCheckoutSession(event: Stripe.Event): Promise<Stripe.Checkout.Session> {
  if (!event.data?.object) {
    throw new Error("Invalid Stripe event: missing event.data.object");
  }

  if (event.type !== "checkout.session.completed") {
    throw new Error(`Invalid Stripe event type: expected 'checkout.session.completed', got '${event.type}'`);
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (!session.payment_status) {
    throw new Error("Invalid checkout session: missing payment_status");
  }

  if (session.payment_status !== "paid") {
    throw new Error(`Invalid payment status: expected 'paid', got '${session.payment_status}'`);
  }

  return session;
}

async function validateStripeSignature(body: string, signature: string | null): Promise<Stripe.Event> {
  if (!signature) {
    throw new Error("No stripe signature found");
  }

  try {
    return stripe.webhooks.constructEvent(body, signature, env.STRIPE_WEBHOOK_CHECKOUT_SIGNING_SECRET);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to validate Stripe webhook signature: ${error.message}`);
    }
    throw new Error("Failed to validate Stripe webhook signature");
  }
}
