import { redirect } from "next/navigation";

import { getAgent } from "@/api/actions/agent/queries";

import { CreatePostsForm } from "@/components/features/posts/create-posts-form";
import { CreatePostsFormProvider } from "@/components/features/posts/create-posts-form-provider";

export default async function PageContent() {
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
