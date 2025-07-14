"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircleIcon, MailIcon } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod/v4";

import { addToWaitlist } from "@/data/waitlist/mutations";

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

interface WaitlistProps extends React.ComponentProps<typeof Button> {
  buttonLabel?: string;
}

const formSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
});

export function Waitlist(props: WaitlistProps) {
  const [submitted, setSubmitted] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    startTransition(async () => {
      console.log("Submitting waitlist", data);
      await addToWaitlist(data);
      setSubmitted(true);
    });
  }

  return (
    <Form {...form}>
      <Dialog>
        <DialogTrigger asChild>
          <Button {...props}>{props.buttonLabel ?? "Get Started"}</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="space-y-1">
            <DialogTitle className="flex items-center gap-2">
              <MailIcon className="mb-1 size-8" />
              <span className="text-2xl font-semibold tracking-tight">Join the Waitlist</span>
            </DialogTitle>
            {!submitted && (
              <DialogDescription className="text-pretty">
                Be the first to know when we launch and get early access to the platform.
              </DialogDescription>
            )}
          </DialogHeader>
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
