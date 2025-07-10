import { type FileRouter, createUploadthing } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

import { getCurrentAgentId } from "@/features/agent/actions/agent";
import { getCurrentUser } from "@/features/auth/actions/user";

const uploadthing = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const postImageFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: uploadthing({
    image: {
      /**
       * For full list of options and defaults, see the File Route API reference
       * @see https://docs.uploadthing.com/file-routes#route-config
       */
      maxFileSize: "4MB",
      maxFileCount: 10,
    },
  })
    // Set permissions and file types for this FileRoute
    .middleware(async () => {
      const { userId } = await getCurrentUser();
      const agentId = await getCurrentAgentId();

      // If you throw, the user will not be able to upload
      if (!userId) throw new UploadThingError("Unauthorized");
      if (!agentId) throw new UploadThingError("Agent not found");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { agentId, userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);

      console.log("file url", file.ufsUrl);

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type PostImageFileRouter = typeof postImageFileRouter;
