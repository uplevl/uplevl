"use client";

import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";

import { Button, type ButtonVariants } from "@/components/ui/button";

import { createStripeSession } from "@/features/subscription/actions/stripe";
import { type PriceTag } from "@/features/subscription/constants";

interface SubscribeButtonProps {
  priceTag: PriceTag;
  label: string;
  variant?: ButtonVariants["variant"];
}

function SubscribeButton({ priceTag, label, variant }: SubscribeButtonProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function handleButtonClick() {
    startTransition(async () => {
      try {
        const url = await createStripeSession(priceTag, pathname);
        router.push(url);
      } catch (error) {
        console.error("Failed to create subscription:", error);
        // You might want to show a toast or error message to the user here
      }
    });
  }

  return (
    <Button
      disabled={isPending}
      size="lg"
      variant={variant}
      className="h-12 w-full text-sm"
      onClick={handleButtonClick}
    >
      {label}
    </Button>
  );
}

export default SubscribeButton;
