import Link from "next/link";

import { Button } from "@/components/ui/button";

import { Waitlist } from "../waitlist";

export function Hero() {
  return (
    <section className="from-background to-background via-primary/10 bg-linear-to-b">
      <div className="mx-auto flex max-w-screen-2xl flex-col items-center gap-6 px-4 py-10 sm:py-20">
        <h1 className="text-center text-3xl leading-[1.1] font-bold tracking-tight text-balance md:max-w-[50%] lg:text-[3.5rem]">
          The Fastest Way to Grow Your Business On Autopilot
        </h1>
        <p className="text-center text-balance text-neutral-600 sm:text-lg md:max-w-[50%]">
          Automate bookings, social media content, and customer follow-ups, so you can grow faster without hiring more
          staff or managing a dozen tools.
        </p>
        <div className="mt-3 flex items-center gap-4 sm:mt-6">
          <Waitlist size="lg" />
          <Button size="lg" variant="outline" asChild>
            <Link href="/book-a-demo">Book a Demo</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
