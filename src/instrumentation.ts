// instrumentation.js
export function register() {
  // No-op for initialization
}

export async function onRequestError(err: Error, request: Request) {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { getPostHogServer } = await import("./lib/posthog-server");
    const posthog = getPostHogServer();
    let distinctId = null;
    if ("cookie" in request.headers) {
      const cookieString = request.headers.get("cookie")!;
      const postHogCookieMatch = cookieString.match(/ph_phc_.*?_posthog=([^;]+)/);

      if (postHogCookieMatch && postHogCookieMatch[1]) {
        try {
          const decodedCookie = decodeURIComponent(postHogCookieMatch[1]);
          const postHogData = JSON.parse(decodedCookie);
          distinctId = postHogData.distinct_id;
        } catch (e) {
          console.error("Error parsing PostHog cookie:", e);
        }
      }
    }

    posthog.captureException(err, distinctId || undefined);
  }
}
