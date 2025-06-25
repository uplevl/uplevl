import { env } from "@/lib/env/server";

export const PriceTagTypes = {
  FOUNDING_MEMBER: "FOUNDING_MEMBER",
  STARTER: "STARTER",
  PROFESSIONAL: "PROFESSIONAL",
  ENTERPRISE: "ENTERPRISE",
} as const;

export type PriceTag = (typeof PriceTagTypes)[keyof typeof PriceTagTypes];

export const priceTags: Record<PriceTag, string> = {
  FOUNDING_MEMBER: env.STRIPE_PRICE_ID_FOUNDING_MEMBER,
  STARTER: env.STRIPE_PRICE_ID_STARTER,
  PROFESSIONAL: env.STRIPE_PRICE_ID_PROFESSIONAL,
  ENTERPRISE: env.STRIPE_PRICE_ID_ENTERPRISE,
};
