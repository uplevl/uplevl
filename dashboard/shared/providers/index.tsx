import { ClerkProvider } from "@clerk/clerk-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { BrowserRouter } from "react-router";

import { env } from "@@/env";

import ToastProvider from "./toast.provider";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <BrowserRouter basename={env.BASE_URL}>
      <QueryClientProvider client={queryClient}>
        <ClerkProvider publishableKey={env.VITE_CLERK_PUBLISHABLE_KEY}>
          <ToastProvider>{children}</ToastProvider>
        </ClerkProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}
