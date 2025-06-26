import Image from "next/image";
import Markdown from "react-markdown";

import { type Post } from "@/database/schema";

import { getFormattedDateTime } from "@/lib/utils";

import { Card, CardContent } from "@/components/ui/card";

import PostBadge from "../post-badge";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Card className="w-full" data-status={post.status} data-review-status={post.reviewStatus} data-post-id={post.id}>
      <CardContent className="grid items-start gap-4 sm:grid-cols-[auto_1fr]">
        <Image
          src={post.imageUrl}
          alt="Post Image"
          width={180}
          height={180}
          className="aspect-square overflow-hidden rounded-md object-cover sm:size-45 2xl:size-28"
        />
        <div className="space-y-2">
          <div className="flex items-center gap-x-2">
            <PostBadge status={post.status} />
          </div>
          <div className="text-muted-foreground text-xs">
            Created at {getFormattedDateTime(new Date(post.createdAt))}
          </div>
          <div className="space-y-1 text-sm">
            <Markdown>{post.content}</Markdown>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
