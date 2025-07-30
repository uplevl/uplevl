import { redirect } from "next/navigation";

import { INTEGRATION_STRATEGIES } from "@/database/schema";

import { addNewIntegration } from "@/api/actions/integrations/social-accounts";

export const dynamic = "force-dynamic";

interface InstagramCallbackProps {
  searchParams: Promise<{
    code: string;
  }>;
}

export default async function InstagramCallback({ searchParams }: InstagramCallbackProps) {
  const { code } = await searchParams;

  if (code) {
    await addNewIntegration(INTEGRATION_STRATEGIES.INSTAGRAM, code);
    return redirect("/dashboard/integrations");
  }

  return redirect("/sign-up");
}
