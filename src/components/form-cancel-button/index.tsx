"use client";

import { useRouter } from "next/navigation";
import { useFormContext, useFormState } from "react-hook-form";

import { Button } from "@/components/ui/button";

interface EditCancelButtonProps {
  redirectTo?: string;
}

export default function FormCancelButton({ redirectTo }: EditCancelButtonProps) {
  const router = useRouter();
  const form = useFormContext();
  const { isDirty } = useFormState(form);

  function handleCancel() {
    form.reset();
    router.push(redirectTo ?? "/dashboard");
  }

  return (
    <Button type="button" variant="secondary" disabled={isDirty} onClick={handleCancel}>
      Cancel
    </Button>
  );
}
