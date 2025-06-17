import * as ngrok from "@ngrok/ngrok";
import { config } from "dotenv";
import { expand } from "dotenv-expand";
import { z } from "zod/v4";

expand(config());

try {
  const EnvSchema = z.object({
    NGROK_AUTH_TOKEN: z.string().min(1),
    DASHBOARD_PORT: z.coerce.number().default(4000),
  });

  const env = EnvSchema.parse(process.env);

  (async function () {
    const listener = await ngrok.forward({
      // The port your app is running on.
      addr: env.DASHBOARD_PORT,
      authtoken: env.NGROK_AUTH_TOKEN,
      // If you haven't reserved a domain, omit this
      domain: "dev.uplevl.ai",
      // Secure your endpoint with a traffic policy.
      // This could also be a path to a traffic policy file.
      traffic_policy: '{"on_http_request": [{"actions": [{"type": "oauth","config": {"provider": "google"}}]}]}',
    });

    // Output ngrok url to console
    console.log(`Ingress established at ${listener.url()}`);
  })();

  // Keep the process alive
  process.stdin.resume();
} catch (error) {
  if (error instanceof Error) {
    console.error(error.message);
  } else {
    console.error("An unknown error occurred", error);
  }
  process.exit(1);
}
