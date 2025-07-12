import { getAgent } from "@/data/agent/queries";

import { Page, PageHeader } from "@/components/common/page";
import { CreatePostsForm } from "@/components/features/posts/create-posts-form";
import { CreatePostsFormProvider } from "@/components/features/posts/create-posts-form-provider";

export default async function NewPostPage() {
  const agent = await getAgent();

  return (
    <Page>
      <PageHeader title="New Post(s)" description="Create a new social post(s)." />
      <div className="space-y-6">
        <CreatePostsFormProvider agent={agent}>
          <CreatePostsForm />
        </CreatePostsFormProvider>
      </div>
    </Page>
  );
}
