import { generateUploadButton, generateUploadDropzone } from "@uploadthing/react";

import type { PostImageFileRouter } from "@/app/api/uploadthing/core";

export const UploadButton = generateUploadButton<PostImageFileRouter>();
export const UploadDropzone = generateUploadDropzone<PostImageFileRouter>();
