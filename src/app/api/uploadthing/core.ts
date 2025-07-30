import { type FileRouter, createUploadthing } from "uploadthing/next";

import { getAgentId } from "@/api/actions/agent/queries";
import { verifySession } from "@/api/actions/user/queries";

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
      maxFileCount: 20,
    },
  })
    // Set permissions and file types for this FileRoute
    .middleware(async () => {
      const { userId } = await verifySession();
      const agentId = await getAgentId();

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
