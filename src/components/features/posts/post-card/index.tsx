import Image from "next/image";

import { POST_REVIEW_STATUSES, type Post } from "@/database/schema";

import { getFormattedPostDate } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import PostBadge from "../post-badge";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
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
            src={post.imageUrl}
            alt="Post Image"
            width={1080}
            height={1350}
            className="relative aspect-[4/5] max-w-full overflow-hidden rounded-md object-cover"
          />
          <PostBadge status={post.status} className="absolute top-2 right-2" />
        </div>
        <div className="flex-1 space-y-1">
          <div className="text-muted-foreground text-xs">
            Created at {getFormattedPostDate(new Date(post.createdAt))}
          </div>
          <div className="space-y-1 text-sm">{post.content}</div>
        </div>
        <Button variant={isPending ? "default" : "outline"} disabled={isApproved}>
          {buttonLabel}
        </Button>
      </CardContent>
    </Card>
  );
}
