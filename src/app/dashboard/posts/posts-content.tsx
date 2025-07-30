import { getPosts } from "@/api/actions/posts/queries";

import EmptyState from "@/components/features/posts/empty-state";
import PostCard from "@/components/features/posts/post-card";

export default async function PostsContent() {
  const posts = await getPosts();

  if (posts.length === 0) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 2xl:grid-cols-5">
        <EmptyState />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 2xl:grid-cols-5">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
