import { type useUser } from "@clerk/nextjs";
import type { StaticImageData } from "next/image";

export interface UpsellSuggestion {
  name: string;
  description: string;
  price: string;
}

export interface Upsell {
  services: string[];
  suggestions: UpsellSuggestion[];
}

export interface LoyaltyPerk {
  status: string;
  name: string;
  description: string;
  options: string[];
}

export interface IndustryPromptProps {
  character: Character;
  userData: ReturnType<typeof useUser>["user"] | null;
  company: string;
  services: string | null;
  upsell: Upsell[] | null;
  perks: LoyaltyPerk[] | null;
}

export interface Industry {
  id: string;
  name: string;
  buildIndustryPrompt: (props: IndustryPromptProps) => string;
  welcomeMessageNewCustomer: string[];
  welcomeMessageReturningCustomer: string[];
}

export interface Character {
  id: string;
  name: string;
  characterPrompt: string;
  image: StaticImageData;
  description: string;
}

export interface ServicePrice {
  amount: number;
  tier?: string;
}

export interface Service {
  name: string;
  description: string;
  category?: string;
  prices: ServicePrice[];
  data?: Record<string, unknown>;
}

export interface ChatMessage {
  role: "agent" | "user";
  content: string;
  delay: number;
}
