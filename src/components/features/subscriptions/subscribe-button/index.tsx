"use client";

import { useMutation } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";

import { type PriceTag } from "@/constants/prices";

import { createStripeSession } from "@/api/actions/subscriptions/mutations";

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
  const { mutate, isPending } = useMutation({
    mutationFn: createStripeSession,
  });

  function handleButtonClick() {
    mutate(
      { priceTag, pathname },
      {
        onSuccess: (url) => {
          router.push(url);
        },
        onError: (error) => {
          console.error("Failed to create subscription:", error);
        },
      },
    );
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
