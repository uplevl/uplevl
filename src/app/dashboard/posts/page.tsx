import { PlusIcon } from "lucide-react";
import { type Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

// import { Card, CardContent } from "@/components/ui/card";

import { getPosts } from "@/data/posts/queries";

import { Page, PageHeader } from "@/components/common/page";
import { PageLoading } from "@/components/common/page-loading";
import EmptyState from "@/components/features/posts/empty-state";
import PostCard from "@/components/features/posts/post-card";
import { Button } from "@/components/ui/button";

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

async function PostsContent() {
  const posts = await getPosts();

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 2xl:grid-cols-5">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
      {posts.length === 0 && (
        <div className="col-span-full">
          <EmptyState />
        </div>
      )}
    </div>
  );
}
