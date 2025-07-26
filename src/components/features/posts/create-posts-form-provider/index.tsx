"use client";

import { DialogTitle } from "@radix-ui/react-dialog";
import { atom } from "jotai";
import { useAtom } from "jotai/react";
import { atomWithStorage } from "jotai/utils";
import Image from "next/image";
import { useRouter } from "next/router";
import { createContext, use, useState } from "react";

import { POST_REVIEW_STATUSES, POST_STATUSES } from "@/database/schema";

import { type SocialMediaPost, runPostAgent } from "@/api/agents/post";
import { type AgentWithOfferings } from "@/data/agent/types";
import { insertPost } from "@/data/posts/mutations";

import { LoadingButton } from "@/components/common/loading-button";
import { Spinner } from "@/components/common/spinner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader } from "@/components/ui/dialog";

const uploadedFilesAtom = atomWithStorage<string[]>("uplv_np_uploaded_files", []);
const descriptionAtom = atomWithStorage<string>("uplv_np_description", "");
const dripCampaignAtom = atomWithStorage<boolean>("uplv_np_drip_campaign", false);
const isSubmittingAtom = atom<boolean>(false);

const CreatePostsFormContext = createContext<{
  images: string[];
  setImages: (images: string[]) => void;
  description: string;
  setDescription: (description: string) => void;
  dripCampaign: boolean;
  setDripCampaign: (dripCampaign: boolean) => void;
}>({
  images: [],
  setImages: () => {},
  description: "",
  setDescription: () => {},
  dripCampaign: false,
  setDripCampaign: () => {},
});

interface CreatePostsFormProviderProps {
  children: React.ReactNode;
  agent: AgentWithOfferings;
}

export function CreatePostsFormProvider({ children, agent }: CreatePostsFormProviderProps) {
  const router = useRouter();
  const [uploadedFiles, setUploadedFiles] = useAtom(uploadedFilesAtom);
  const [description, setDescription] = useAtom(descriptionAtom);
  const [dripCampaign, setDripCampaign] = useAtom(dripCampaignAtom);
  const [isSubmitting, setIsSubmitting] = useAtom(isSubmittingAtom);
  const [posts, setPosts] = useState<SocialMediaPost[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  const canSubmit = uploadedFiles.length > 0;

  async function handleSubmit() {
    setIsSubmitting(true);
    setDialogOpen(true);

    await Promise.all(
      uploadedFiles.map(async (image) => {
        const post = await runPostAgent({ imageUrl: image, description: description });
        setPosts((prev) => [...prev, post]);
        await insertPost({
          agentId: agent.id,
          imageUrl: image,
          content: post.content,
          status: POST_STATUSES.DRAFT,
          reviewStatus: POST_REVIEW_STATUSES.PENDING,
        });
      }),
    );

    setIsSubmitting(false);
  }

  function handleFinish() {
    setDialogOpen(false);
    setUploadedFiles([]);
    setDescription("");
    setDripCampaign(false);
    setPosts([]);
    router.push("/dashboard/posts");
  }

  const values = {
    images: uploadedFiles,
    description: description,
    dripCampaign: dripCampaign,
  };

  return (
    <CreatePostsFormContext
      value={{
        ...values,
        setImages: setUploadedFiles,
        setDescription: setDescription,
        setDripCampaign: setDripCampaign,
      }}
    >
      {children}
      <div className="flex items-center justify-end gap-4">
        <LoadingButton type="button" disabled={!canSubmit} onClick={handleSubmit} isLoading={isSubmitting}>
          Create Posts(s)
        </LoadingButton>
      </div>
      <Dialog open={dialogOpen}>
        <DialogContent className="min-w-[600px]">
          <DialogHeader>
            <DialogTitle>{dripCampaign ? "Creating a drip campaign" : "Creating a post"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {uploadedFiles.map((file) => {
              const post = posts.find((post) => post.imageUrl === file);

              return (
                <div key={file} className="flex items-center gap-4 rounded-lg bg-white p-4">
                  <Image src={file} alt="" width={100} height={100} className="aspect-square rounded-lg object-cover" />
                  {post?.content ? <p className="text-sm">{post.content}</p> : <Spinner />}
                </div>
              );
            })}
          </div>
          <DialogFooter>
            <Button type="button" onClick={handleFinish} disabled={isSubmitting}>
              Finish
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </CreatePostsFormContext>
  );
}

export function useCreatePostsForm() {
  const context = use(CreatePostsFormContext);

  if (!context) {
    throw new Error("useCreatePostsForm must be used within a CreatePostsFormProvider");
  }

  return context;
}
