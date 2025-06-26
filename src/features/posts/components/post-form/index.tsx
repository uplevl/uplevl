"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";

import { type PostWithMeta } from "@/features/posts/actions/posts";

interface PostFormProps {
  post?: PostWithMeta;
}

export default function PostForm({ post }: PostFormProps) {
  const images = post?.meta?.filter((meta) => meta.key === "image") ?? [];
  return (
    <div className="space-y-6">
      {images.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {images.map((image) => (
            <div key={image.id}>
              <Image src={image.value} alt={image.key} width={100} height={100} className="rounded-md object-cover" />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center space-y-2 rounded-lg border border-dashed border-gray-300 p-[50px] transition-colors duration-300 ease-out hover:border-gray-400 hover:bg-gray-100">
          <p className="text-muted-foreground text-sm">No images added yet.</p>
          <p className="text-muted-foreground text-sm">
            Add images by dragging and dropping them here, or by clicking the button below.
          </p>
          <Button variant="outline" size="sm">
            Upload Images
          </Button>
        </div>
      )}
    </div>
  );
}
