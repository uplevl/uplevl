"use server";

import { z } from "zod/v4";

import { clerkClient } from "@/lib/clerk";

const waitlistSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
});

type AddToWaitlistProps = z.infer<typeof waitlistSchema>;

export async function addToWaitlist(props: AddToWaitlistProps) {
  try {
    // Validate the request body
    const result = waitlistSchema.safeParse(props);

    if (!result.success) {
      // await captureException(result.error);
      return null;
    }

    // Add the user to the waitlist
    clerkClient.waitlistEntries.create({ emailAddress: result.data.email });
  } catch (error) {
    console.error(error);
    // await captureException(error);
    return null;
  }
}
