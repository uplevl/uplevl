import type { UserRole } from "@/features/user/types";

declare global {
  // Is used in the widget to set the server URL
  const SERVER_URL: string;

  interface CustomJwtSessionClaims {
    metadata: {
      onboardingComplete?: boolean;
      role?: UserRole;
    };
  }
}

export {};
