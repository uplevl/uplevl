import { SignedIn as ClerkSignedIn, SignedOut as ClerkSignedOut } from "@clerk/nextjs";
import { Suspense } from "react";

import { Spinner } from "@/components/spinner";

export function SignedOut({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<Spinner />}>
      <ClerkSignedOut>{children}</ClerkSignedOut>
    </Suspense>
  );
}

export function SignedIn({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<Spinner />}>
      <ClerkSignedIn>{children}</ClerkSignedIn>
    </Suspense>
  );
}
