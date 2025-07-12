"use client";

import { useUser } from "@clerk/nextjs";
import { usePostHog } from "posthog-js/react";
import { useEffect } from "react";

export function PosthogIdentifyProvider() {
  const posthog = usePostHog();
  const { user } = useUser();

  useEffect(() => {
    if (user && posthog && !posthog._isIdentified()) {
      posthog.identify(user.id, {
        email: user.primaryEmailAddress?.emailAddress,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.publicMetadata?.role,
        // organisation: user.publicMetadata.orgId,
      });
    }
    if (!user) {
      posthog.reset();
    }
  }, [posthog, user]);

  return null;
}
