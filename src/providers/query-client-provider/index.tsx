"use client";

import { QueryClientProvider as OriginalQueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useState } from "react";

interface QueryClientProviderProps {
  children: React.ReactNode;
}

export function QueryClientProvider({ children }: QueryClientProviderProps) {
  const [queryClient] = useState(() => new QueryClient());

  return <OriginalQueryClientProvider client={queryClient}>{children}</OriginalQueryClientProvider>;
}
