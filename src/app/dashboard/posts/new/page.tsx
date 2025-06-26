import { Page, PageHeader } from "@/components/page";

import EditCancelButton from "@/features/posts/components/edit-cancel-button";
import PostForm from "@/features/posts/components/post-form";

export default function NewPostPage() {
  return (
    <Page>
      <PageHeader title="New Post" description="Create a new social post.">
        <EditCancelButton />
      </PageHeader>
      <PostForm />
    </Page>
  );
}
