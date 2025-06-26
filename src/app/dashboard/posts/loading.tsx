import { PlusIcon } from "lucide-react";

import { Page, PageHeader } from "@/components/page";
import { PageLoading } from "@/components/page-loading";
import { Button } from "@/components/ui/button";

export default function PostsLoadingPage() {
  return (
    <Page>
      <PageHeader title="Social Posts" description="Here you can manage your social posts.">
        <Button disabled>
          <PlusIcon />
          <span>Add New Post</span>
        </Button>
      </PageHeader>
      <PageLoading />
    </Page>
  );
}
