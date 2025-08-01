"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { CheckCircleIcon, MailIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod/v4";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { addToWaitlist } from "@/features/waitlist/api/mutations";

interface WaitlistDialogProps extends React.ComponentProps<typeof Button> {
  buttonLabel?: string;
}

const formSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
});

export function WaitlistDialog({ buttonLabel, ...props }: WaitlistDialogProps) {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { mutate, isPending } = useMutation({
    mutationFn: addToWaitlist,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    setError(null); // Clear any previous errors
    mutate(data, {
      onSuccess: () => {
        setError(null);
      },
      onError: (error) => {
        setError(error.message);
      },
      onSettled: () => {
        setSubmitted(true);
      },
    });
  }

  return (
    <Form {...form}>
      <Dialog>
        <DialogTrigger asChild>
          <Button id="waitlist-button" {...props} data-tracking-label="Waitlist Signup Button Clicked">
            {buttonLabel ?? "Get Started"}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="space-y-1">
            <DialogTitle className="flex items-center gap-2">
              <MailIcon className="mb-1 size-8" />
              <span className="text-2xl font-semibold tracking-tight">Join the Waitlist</span>
            </DialogTitle>
            {!submitted && (
              <DialogDescription className="text-balance">
                Be the first to know when we launch and get early access to the platform.
              </DialogDescription>
            )}
          </DialogHeader>
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-2">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}
          {submitted ? (
            <div className="flex flex-col items-center justify-center gap-4">
              <CheckCircleIcon className="size-12 text-green-500" />
              <p className="text-muted-foreground text-sm">
                <strong>You&apos;ve been added to the waitlist.</strong>
                <br />
                We&apos;ll notify you when we launch.
              </p>
            </div>
          ) : (
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="firstName"
                disabled={isPending}
                render={({ field }) => (
                  <FormItem className="sm:col-span-1">
                    <FormControl>
                      <Input placeholder="Your First Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                disabled={isPending}
                render={({ field }) => (
                  <FormItem className="sm:col-span-1">
                    <FormControl>
                      <Input placeholder="Your Last Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                disabled={isPending}
                render={({ field }) => (
                  <FormItem className="sm:col-span-2">
                    <FormControl>
                      <Input placeholder="Your Email Address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center">
                <Button type="submit" size="lg" disabled={isPending}>
                  Join Waitlist
                </Button>
                <p className="text-muted-foreground text-center text-xs sm:text-left">
                  We respect your privacy. Unsubscribe anytime.
                </p>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </Form>
  );
}
