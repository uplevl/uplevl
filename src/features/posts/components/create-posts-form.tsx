"use client";

import { PlusIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { type ClientUploadedFileData } from "uploadthing/types";

import { UploadDropzone } from "@/lib/uploadthing";
import { cn } from "@/lib/utils";

import { FormPanel } from "@/components/form-panel";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

import { useCreatePostsForm } from "@/features/posts/components/create-posts-form-provider";

export function CreatePostsForm() {
  const createPostsForm = useCreatePostsForm();
  const [dialogOpen, setDialogOpen] = useState(false);

  const numUploadedFiles = createPostsForm.images.length;

  function handleUploadedFiles(fileData: ClientUploadedFileData<{ uploadedBy: string }>[]) {
    createPostsForm.setImages(fileData.map((file) => file.ufsUrl));
    setDialogOpen(false);
  }

  return (
    <>
      <FormPanel title="Images" description="Start by adding your image(s) here">
        <div className="col-span-2 space-y-4">
          {/*  */}
          <div className="grid grid-cols-2 gap-2 md:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8">
            {createPostsForm.images.map((image) => (
              <Image
                key={image}
                src={image}
                alt=""
                width={250}
                height={250}
                className="aspect-square rounded-lg object-cover shadow-md"
              />
            ))}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <button
                  type="button"
                  className="border-card group text-muted-foreground hover:text-foreground flex aspect-square cursor-pointer flex-col items-center justify-center gap-1 rounded-lg bg-white p-2 text-sm shadow-md transition-colors duration-300 ease-out hover:bg-neutral-50"
                >
                  <PlusIcon />
                  <span className="">Add Image(s)</span>
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Upload Image(s)</DialogTitle>
                  <DialogDescription>You can upload up to 20 images at a time.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-2">
                  <UploadDropzone
                    endpoint="imageUploader"
                    appearance={{
                      container:
                        "cursor-pointer border-neutral-400/75 bg-neutral-200/15 transition-colors duration-300 ease-out hover:bg-neutral-200/50",
                      button: cn(buttonVariants({ variant: "default", size: "lg" }), "!text-foreground"),
                    }}
                    onClientUploadComplete={handleUploadedFiles}
                  />
                </div>
              </DialogContent>
            </Dialog>
          </div>
          {numUploadedFiles > 0 && (
            <Card className="sm:py-4">
              <CardContent className="sm:px-4">
                {numUploadedFiles > 1 && (
                  <div className="space-y-2">
                    <p className="text-muted-foreground text-sm">
                      <strong>Recommendation:</strong> You uploaded {numUploadedFiles} files. We recommend creating a
                      drip campaign from your uploads. This will help you to be more engaging and creating a more
                      personalized experience for your audience.
                    </p>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="drip-campaign"
                        checked={createPostsForm.dripCampaign}
                        onCheckedChange={createPostsForm.setDripCampaign}
                      />
                      <Label htmlFor="drip-campaign">
                        Drip Campaign <i className="text-muted-foreground font-normal">(recommended)</i>
                      </Label>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </FormPanel>

      <FormPanel
        title="Description"
        description="This is optional. But it will help the agent, better understand what the images show and their context."
      >
        <Textarea
          value={createPostsForm.description}
          onChange={(e) => createPostsForm.setDescription(e.target.value)}
          rows={4}
          className="col-span-2 w-full resize-none"
          placeholder="Give some context to your uploaded images"
        />
      </FormPanel>
    </>
  );
}
