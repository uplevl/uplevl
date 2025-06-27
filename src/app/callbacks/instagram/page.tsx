import { redirect } from "next/navigation";

import { INTEGRATION_STRATEGIES } from "@/database/schema";

import { addNewIntegration } from "@/features/integrations/actions/social-accounts";

interface InstagramCallbackProps {
  searchParams: Promise<{
    code: string;
  }>;
}

export default async function InstagramCallback({ searchParams }: InstagramCallbackProps) {
  const { code } = await searchParams;

  if (code) {
    console.log("code", code);
    await addNewIntegration(INTEGRATION_STRATEGIES.INSTAGRAM, code);
    return redirect("/dashboard/integrations");
  }

  return redirect("/sign-up");
}
