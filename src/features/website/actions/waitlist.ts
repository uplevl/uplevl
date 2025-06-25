"use server";

import { createClerkClient } from "@clerk/nextjs/server";
import { z } from "zod";

import { env } from "@/lib/env/server";

const clerkClient = createClerkClient({ secretKey: env.CLERK_SECRET_KEY });

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

    const addedPerson = await addPersonToPipedrive({
      email: result.data.email,
      firstName: result.data.firstName,
      lastName: result.data.lastName,
    });

    // Add the user to the waitlist
    clerkClient.waitlistEntries.create({ emailAddress: result.data.email });

    return addedPerson;
  } catch (error) {
    console.error(error);
    // await captureException(error);
    return null;
  }
}

interface Person {
  id: string;
  first_name: string;
  last_name: string;
}

interface AddPersonToPipedriveProps {
  email: string;
  firstName: string;
  lastName: string;
}

async function addPersonToPipedrive({ email, firstName, lastName }: AddPersonToPipedriveProps): Promise<Person> {
  const inputData = JSON.stringify({
    emails: [{ value: email }],
    name: `${firstName} ${lastName}`,
    label_ids: [30, 15],
  });

  const result = await fetch(`${env.PIPEDRIVE_API_URL}/persons`, {
    method: "POST",
    headers: {
      "x-api-token": env.PIPEDRIVE_API_KEY,
      "Content-Type": "application/json",
    },
    body: inputData,
  });

  if (!result.ok) {
    const error = new Error("Failed to add person to Pipedrive");
    // await captureException(error, { data: result.body });
    throw error;
  }

  const data = await result.json();

  if (data.success === "false") {
    const error = new Error("Failed to add person to Pipedrive");
    // await captureException(error, { data });
    throw error;
  }

  return data.data;
}
