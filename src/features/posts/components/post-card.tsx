import Image from "next/image";

import { POST_REVIEW_STATUSES } from "@/database/schema";
import { type Post } from "@/database/validation/posts.validation";

import { getFormattedPostDate } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import PostBadge from "@/features/posts/components/post-badge";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const isPending = post.reviewStatus === POST_REVIEW_STATUSES.PENDING;
  const isApproved = post.reviewStatus === POST_REVIEW_STATUSES.APPROVED;
  const buttonLabel = isPending ? "Approve" : "Approved";

  return (
    <Card
      className="w-full py-2 sm:py-4"
      data-status={post.status}
      data-review-status={post.reviewStatus}
      data-post-id={post.id}
    >
      <CardContent className="flex h-full flex-col gap-4 px-2 sm:px-4">
        <div className="relative">
          <Image
            src={post.images[0] ?? ""}
            alt="Post Image"
            width={1080}
            height={1080}
            className="relative aspect-square max-w-full rounded-lg object-cover"
          />
          <PostBadge status={post.status} className="absolute top-2 right-2" />
        </div>
        <div className="flex-1 space-y-2">
          <div className="space-y-1 text-sm">{post.content}</div>
        </div>
        <div className="text-muted-foreground text-xs">Created at {getFormattedPostDate(new Date(post.createdAt))}</div>
        <Button variant={isPending ? "default" : "outline"} disabled={isApproved}>
          {buttonLabel}
        </Button>
      </CardContent>
    </Card>
  );
}
