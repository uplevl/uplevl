"use server";

import { z } from "zod/v4";

import { db } from "@/database";
import { WaitlistTable } from "@/database/schema";

import { EMAIL_SENDER_PERSONAL, EMAIL_SENDER_SYSTEM } from "@/constants/emails";
import { clerkClient } from "@/lib/clerk";
import { env } from "@/lib/env/server";
import { getPostHogServer } from "@/lib/posthog-server";
import { resend } from "@/lib/resend";

import { WaitlistIssueEmail } from "@/features/emails/components/waitlist-issue-email";
import { WelcomeEmailOne, WelcomeEmailThree, WelcomeEmailTwo } from "@/features/emails/components/welcome-emails";

const waitlistSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
});

export type AddToWaitlistProps = z.infer<typeof waitlistSchema>;

type WaitlistResult = { success: true; message: null } | { success: false; message: string };

const IS_DEV = env.NODE_ENV === "development";
const WELCOME_EMAIL_1_DELAY = IS_DEV ? "in 1 minute" : "in 1 minute";
const WELCOME_EMAIL_2_DELAY = IS_DEV ? "in 2 minute" : "in 2 days";
const WELCOME_EMAIL_3_DELAY = IS_DEV ? "in 3 minutes" : "in 5 days";

const posthog = getPostHogServer();

export async function addToWaitlist(props: AddToWaitlistProps): Promise<WaitlistResult> {
  try {
    // Validate the request body
    const result = waitlistSchema.safeParse(props);

    if (!result.success) {
      console.error("Validation failed:", result.error.format());
      return {
        success: false,
        message:
          "Oops! It looks like there was a problem with your input. Could you please double-check and try again?",
      };
    }

    const { email, firstName, lastName } = result.data;

    // Add the user to Clerk waitlist
    const waitlistEntry = await clerkClient.waitlistEntries.create({
      emailAddress: email,
    });

    if (waitlistEntry.status === "rejected") {
      console.warn("Waitlist entry rejected for:", email);

      await Promise.all([
        resend.emails.send({
          from: EMAIL_SENDER_PERSONAL,
          to: [email],
          subject: "I am sorry for the waitlist issue",
          react: WaitlistIssueEmail({ firstName }),
        }),
        resend.emails.send({
          from: EMAIL_SENDER_SYSTEM,
          to: env.SYSTEM_EMAIL_RECIPIENTS.split(","),
          subject: "Waitlist Issue",
          text: `Waitlist Issue for ${email}\n\n${JSON.stringify(waitlistEntry)}`,
        }),
      ]).catch((error) => {
        console.error("Failed to send waitlist issue email:", error);
        posthog.captureException(error, email, { email, firstName, lastName });
      });

      return {
        success: false,
        message:
          "We are sorry, but we are unable to add you to the waitlist at this time. We contacted you via email about this.",
      };
    }

    // Use transaction for database operations
    await db.transaction(async (tx) => {
      await tx
        .insert(WaitlistTable)
        .values({
          id: waitlistEntry.id,
          email,
          firstName,
          lastName,
        })
        .onConflictDoUpdate({
          target: [WaitlistTable.email],
          set: {
            firstName,
            lastName,
          },
        });
    });

    // Schedule welcome emails asynchronously (don't await to avoid blocking)
    scheduleWelcomeEmails(email, firstName, lastName).catch((error) => {
      console.error("Email scheduling failed for user:", email, error);
      posthog.captureException(error, email, { email, firstName, lastName });
    });

    console.log("Successful waitlist signup:", { email, firstName, lastName });
    // Log successful signup for analytics
    posthog.capture({
      event: "Waitlist Signup",
      distinctId: email,
      properties: {
        first_name: firstName,
        last_name: lastName,
        email: email,
      },
    });

    return {
      success: true,
      message: null,
    };
  } catch (error) {
    posthog.captureException(error, props.email, props);
    console.error("Waitlist signup failed:", error, {
      email: props.email,
      firstName: props.firstName,
      lastName: props.lastName,
    });
    return {
      success: false,
      message: "Something went wrong. Please try again later",
    };
  }
}

// Async email sending helper - doesn't block main flow
async function scheduleWelcomeEmails(email: string, firstName: string, lastName: string) {
  // Send emails in parallel and handle failures gracefully
  const emailPromises = [
    resend.emails
      .send({
        from: EMAIL_SENDER_PERSONAL,
        to: [email],
        subject: "You're on the list",
        react: WelcomeEmailOne({ firstName }),
        scheduledAt: WELCOME_EMAIL_1_DELAY,
      })
      .catch((error) => {
        console.error("Failed to send welcome email 1:", error);
        posthog.captureException(error, email, { email, firstName, lastName });
        return { error: "Failed to send welcome email 1", details: error };
      }),

    resend.emails
      .send({
        from: EMAIL_SENDER_PERSONAL,
        to: [email],
        subject: "It's not you. It's how the game is set up",
        react: WelcomeEmailTwo({ firstName }),
        scheduledAt: WELCOME_EMAIL_2_DELAY,
      })
      .catch((error) => {
        console.error("Failed to send welcome email 2:", error);
        posthog.captureException(error, email, { email, firstName, lastName });
        return { error: "Failed to send welcome email 2", details: error };
      }),

    resend.emails
      .send({
        from: EMAIL_SENDER_PERSONAL,
        to: [email],
        subject: "Why I'm building this — even though I hate posting",
        react: WelcomeEmailThree({ firstName }),
        scheduledAt: WELCOME_EMAIL_3_DELAY,
      })
      .catch((error) => {
        console.error("Failed to send welcome email 3:", error);
        posthog.captureException(error, email, { email, firstName, lastName });
        return { error: "Failed to send welcome email 3", details: error };
      }),
  ];

  const results = await Promise.allSettled(emailPromises);

  // Log any email failures for monitoring
  results.forEach((result, index) => {
    if (result.status === "rejected") {
      console.error(`Welcome email ${index + 1} failed:`, result.reason);
    }
  });

  return results;
}
