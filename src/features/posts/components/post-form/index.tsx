"use client";

import { useForm } from "react-hook-form";

import { type Post } from "@/database/schema";

import { Form } from "@/components/ui/form";

interface PostFormProps {
  post?: Post;
}

export default function PostForm({ post }: PostFormProps) {
  const form = useForm({
    defaultValues: {
      content: post?.content ?? "",
      imageUrl: post?.imageUrl ?? "",
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    console.log(data);
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>Post Form goes here</form>
    </Form>
  );
}
