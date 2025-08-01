import { PlusIcon } from "lucide-react";
import { type Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import { Page, PageHeader } from "@/components/page";
import { PageLoading } from "@/components/page-loading";
import { Button } from "@/components/ui/button";

import PostsContent from "./posts-content";

export const metadata: Metadata = {
  title: "Posts",
  description: "Here you can manage your social posts.",
};

export default function PostsPage() {
  return (
    <Page>
      <PageHeader title="Social Posts" description="Here you can manage your social posts.">
        <Button asChild>
          <Link href="/dashboard/posts/new">
            <PlusIcon />
            <span>Add New Post</span>
          </Link>
        </Button>
      </PageHeader>
      <Suspense fallback={<PageLoading />}>
        <PostsContent />
      </Suspense>
    </Page>
  );
}
