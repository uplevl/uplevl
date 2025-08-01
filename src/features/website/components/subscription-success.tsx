"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { TadaIcon } from "@/components/icons";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export function SubscriptionSuccess() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const subscription = searchParams.get("subscription");

  const [open, setOpen] = useState(false);

  function handleOpenChange(newOpen: boolean) {
    setOpen(newOpen);
    if (!newOpen) {
      router.replace("/");
    }
  }

  useEffect(() => {
    if (subscription === "success") {
      setOpen(true);
    }
  }, [subscription]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="to-background from-primary/10 bg-linear-to-b text-balance">
        <DialogHeader className="relative">
          <DialogTitle className="text-2xl font-bold">Congratulations!</DialogTitle>
          <TadaIcon className="pointer-events-none absolute -top-2 right-2 -z-10 size-20 opacity-20" />
        </DialogHeader>
        <p>
          You are now a <strong>Founding Member</strong>.
        </p>
        <p>
          You will soon receive an email with your membership details, also including a link to schedule a personal
          onboarding call with the founder.
        </p>
        <p>We are looking forward to speaking with you!</p>
      </DialogContent>
    </Dialog>
  );
}
