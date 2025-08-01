import Link from "next/link";

import { Button } from "@/components/ui/button";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-y-6 py-8">
      <p className="text-muted-foreground text-sm">
        You don&apos;t have any posts yet. Start by creating your first social post.
      </p>
      <Button size="lg" asChild>
        <Link href="/dashboard/posts/new">Create Your First Post</Link>
      </Button>
    </div>
  );
}
