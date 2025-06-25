import { useFeatureFlagEnabled } from "posthog-js/react";

import { env } from "@/lib/env/client";
import { type FeatureFlag } from "@/lib/feature-flags";

const IS_DEV = env.NEXT_PUBLIC_ENV === "development";

/**
 * Checks if a feature flag is enabled. Flags are enabled by default in development.
 */
export function useFeatureFlag(flag: FeatureFlag) {
  const flagEnabled = useFeatureFlagEnabled(flag);

  if (IS_DEV) return true;

  return Boolean(flagEnabled);
}
