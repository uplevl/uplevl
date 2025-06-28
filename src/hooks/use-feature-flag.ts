import { useFeatureFlagEnabled } from "posthog-js/react";

import { env } from "@/lib/env/client";
import { type FeatureFlag } from "@/lib/feature-flags";

/**
 * Checks if a feature flag is enabled. Flags are enabled by default in development.
 */
export function useFeatureFlag(flag: FeatureFlag) {
  const flagEnabled = useFeatureFlagEnabled(flag);

  // In development, all flags are enabled by default
  if (env.NEXT_PUBLIC_ENV === "development") return true;

  return flagEnabled ?? false;
}
