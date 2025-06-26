"use client";

import { useRouter } from "next/navigation";

import { ConfirmAlert } from "@/components/confirm-alert";
import { Button } from "@/components/ui/button";

export default function EditCancelButton() {
  const router = useRouter();

  return (
    <ConfirmAlert
      title="Are you sure you want to cancel?"
      description="This action cannot be undone."
      onConfirm={() => router.push("/dashboard/posts")}
    >
      <Button variant="secondary">Cancel</Button>
    </ConfirmAlert>
  );
}
