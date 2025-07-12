"use client";

import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";

import { type PriceTag } from "@/constants/prices";

import { createStripeSession } from "@/data/subscriptions/mutations";

import { LoadingButton } from "@/components/common/loading-button";
import { type ButtonVariants } from "@/components/ui/button";

interface SubscribeButtonProps {
  priceTag: PriceTag;
  label: string;
  variant?: ButtonVariants["variant"];
}

export function SubscribeButton({ priceTag, label, variant }: SubscribeButtonProps) {
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
    <LoadingButton
      isLoading={isPending}
      size="lg"
      variant={variant}
      className="h-12 w-full text-sm"
      onClick={handleButtonClick}
    >
      {label}
    </LoadingButton>
  );
}
