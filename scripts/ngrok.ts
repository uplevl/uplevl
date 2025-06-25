import * as ngrok from "@ngrok/ngrok";

import { env } from "@/lib/env/infra";

(async function () {
  const listener = await ngrok.forward({
    // The port your app is running on.
    addr: 3000,
    authtoken: env.NGROK_AUTH_TOKEN,
    // If you haven't reserved a domain, omit this
    domain: "dev.uplevl.ai",
  });

  // Output ngrok url to console
  console.log(`Ingress established at ${listener.url()}`);
})();

// Keep the process alive
process.stdin.resume();
