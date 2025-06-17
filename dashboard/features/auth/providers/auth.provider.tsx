import { useAuth } from "@clerk/clerk-react";
import { Navigate } from "react-router";

import { PageLoading } from "@@/components/page-loading";

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { isLoaded, isSignedIn } = useAuth();

  const isLoading = !isLoaded;

  if (isLoading) {
    return <PageLoading />;
  }

  if (!isSignedIn) {
    return <Navigate to="/sign-in" />;
  }

  return children;
}
