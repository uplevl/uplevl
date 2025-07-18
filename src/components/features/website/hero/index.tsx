import { CheckCircle } from "lucide-react";

import { Eyebrow } from "@/components/eyebrow";

import { Waitlist } from "../waitlist";

export function Hero() {
  return (
    <section className="from-background to-background via-primary/10 bg-linear-to-b">
      <div className="wrapper flex flex-col items-center py-10 sm:py-20">
        <div className="col-span-2 space-y-8 sm:space-y-16">
          <div className="flex flex-col items-center gap-4">
            <Eyebrow>🚀 Now in Beta - Join 200+ Business Owners</Eyebrow>
            <h1 className="leading-tighter text-center text-3xl font-bold tracking-tight text-balance sm:text-4xl md:max-w-[50%] md:text-6xl md:tracking-tighter lg:text-7xl">
              Your Social Media, <span className="text-primary">On Autopilot</span>
            </h1>
            <p className="text-center leading-relaxed text-balance text-neutral-600 sm:text-xl md:text-2xl">
              Stop spending hours on social media. Uplevl transforms your photos into professional posts, schedules them
              perfectly, and engages with customers automatically.
            </p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="mt-3 flex items-center gap-4 sm:mt-6">
              <Waitlist size="xl" />
            </div>
            {/* Trust Indicators */}
            <div className="text-muted-foreground flex flex-col gap-2 text-xs sm:flex-row sm:items-center sm:gap-6 sm:text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Free to join</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Launch mid 2025</span>
              </div>
            </div>
          </div>
          {/* Social Proof */}
          <div className="flex flex-col items-center gap-4">
            <p className="text-muted-foreground text-sm">Trusted by business owners like:</p>
            <div className="text-muted-foreground flex flex-wrap gap-8 text-xs">
              <span className="bg-muted/50 rounded-full border border-neutral-200 px-2 py-1">Hair Salons</span>
              <span className="bg-muted/50 rounded-full border border-neutral-200 px-2 py-1">Auto Repair Shops</span>
              <span className="bg-muted/50 rounded-full border border-neutral-200 px-2 py-1">Med Spas</span>
              <span className="bg-muted/50 rounded-full border border-neutral-200 px-2 py-1">Nail Salons</span>
              <span className="bg-muted/50 rounded-full border border-neutral-200 px-2 py-1">Fitness Studios</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
