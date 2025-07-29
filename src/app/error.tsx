"use client";

// Error boundaries must be Client Components
import { posthog } from "posthog-js";
import { useEffect } from "react";

import { Page } from "@/components/common/page";

export default function Error({ error }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    posthog.captureException(error);
  }, [error]);

  return (
    <Page>
      <div className="flex h-screen flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Something went wrong</h1>
        <p className="text-sm text-gray-500">Please try again later.</p>
      </div>
    </Page>
  );
}
