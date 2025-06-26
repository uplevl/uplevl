import { RedirectToSignIn } from "@clerk/nextjs";
import { PlusIcon } from "lucide-react";
import { type Metadata } from "next";
import Link from "next/link";

import { Page, PageHeader } from "@/components/page";
import { Button } from "@/components/ui/button";

// import { Card, CardContent } from "@/components/ui/card";

import { getCurrentUser } from "@/features/auth/actions/user";
import { getPostsByUserId } from "@/features/posts/actions/posts";
import EmptyState from "@/features/posts/components/empty-state";
import PostCard from "@/features/posts/components/post-card";

export const metadata: Metadata = {
  title: "Posts",
  description: "Here you can manage your social posts.",
};

export default async function PostsPage() {
  const { userId } = await getCurrentUser();
  if (!userId) return <RedirectToSignIn />;

  const posts = await getPostsByUserId(userId);

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
      <div className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
        {posts.length === 0 && (
          <div className="col-span-full">
            <EmptyState />
          </div>
        )}
      </div>
    </Page>
  );
}
