import { redirect } from "next/navigation";

import { getAgent } from "@/features/agent-settings/api/queries";
import { CreatePostsForm } from "@/features/posts/components/create-posts-form";
import { CreatePostsFormProvider } from "@/features/posts/components/create-posts-form-provider";

export async function PageContent() {
  const agent = await getAgent();

  if (!agent) {
    return redirect("/onboarding");
  }

  return (
    <CreatePostsFormProvider agent={agent}>
      <CreatePostsForm />
    </CreatePostsFormProvider>
  );
}
