"use client";

import { ClerkProvider } from "./clerk-provider";
import { JotaiProvider } from "./jotai-provider";
import { PosthogIdentifyProvider } from "./posthog-identify-provider";
import { QueryClientProvider } from "./query-client-provider";
import { ToastProvider } from "./toast-provider";

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <ClerkProvider>
      <JotaiProvider>
        <QueryClientProvider>
          <PosthogIdentifyProvider />
          {children}
          <ToastProvider />
        </QueryClientProvider>
      </JotaiProvider>
    </ClerkProvider>
  );
}
