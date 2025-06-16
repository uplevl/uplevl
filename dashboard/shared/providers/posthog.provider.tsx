import { posthog } from "posthog-js";
import { PostHogProvider as PHProvider, usePostHog } from "posthog-js/react";
import { Suspense, useEffect } from "react";
import { useLocation, useSearchParams } from "react-router";

import { env } from "@@/env";

const IS_DEV = import.meta.env.DEV;

function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // PostHog should not be initialized in development
    if (IS_DEV) return;

    // Initialize PostHog
    posthog.init(env.VITE_POSTHOG_KEY, {
      api_host: env.VITE_POSTHOG_HOST,
      person_profiles: "always",
      capture_pageview: false,
      capture_pageleave: true,
    });
  }, []);

  if (IS_DEV) return <>{children}</>;

  return (
    <PHProvider client={posthog}>
      <Suspense fallback={null}>
        <PostHogPageView />
      </Suspense>
      {children}
    </PHProvider>
  );
}

function PostHogPageView() {
  const { pathname } = useLocation();
  const searchParams = useSearchParams();
  const posthog = usePostHog();

  // Track pageviews
  useEffect(() => {
    if (!pathname || !posthog) {
      return;
    }

    let url = window.origin + pathname;
    if (searchParams.toString()) {
      url = url + `?${searchParams.toString()}`;
    }

    posthog.capture("$pageview", { $current_url: url });
  }, [pathname, searchParams, posthog]);

  return null;
}

export default PostHogProvider;
