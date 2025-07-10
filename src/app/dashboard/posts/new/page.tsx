import { Page, PageHeader } from "@/components/page";

import { CreatePostsForm } from "@/features/posts/components/create-posts-form";
import { CreatePostsFormProvider } from "@/features/posts/providers/create-posts-form-provider";

export default function NewPostPage() {
  return (
    <Page>
      <PageHeader title="New Post(s)" description="Create a new social post(s)." />
      <div className="space-y-6">
        <CreatePostsFormProvider>
          <CreatePostsForm />
        </CreatePostsFormProvider>
      </div>
    </Page>
  );
}
