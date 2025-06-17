import { ClerkProvider } from "@clerk/clerk-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router";

import { env } from "@@/env";

import PostHogProvider from "./posthog.provider";
import ToastProvider from "./toast.provider";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ClerkProvider
      publishableKey={env.VITE_CLERK_PUBLISHABLE_KEY}
      signInUrl="/"
      signUpUrl="/"
      signInForceRedirectUrl="/"
      signInFallbackRedirectUrl="/"
      signUpForceRedirectUrl="/onboarding"
      signUpFallbackRedirectUrl="/onboarding"
    >
      <BrowserRouter basename={env.BASE_URL}>
        <PostHogProvider>
          <QueryClientProvider client={queryClient}>
            <HelmetProvider>
              <ToastProvider>{children}</ToastProvider>
            </HelmetProvider>
          </QueryClientProvider>
        </PostHogProvider>
      </BrowserRouter>
    </ClerkProvider>
  );
}
