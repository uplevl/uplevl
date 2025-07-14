import { ClockIcon, TrendingUpIcon, ZapIcon } from "lucide-react";

import { BentoCard } from "@/components/bento-card";

export function ProblemStatement() {
  return (
    <section className="section-dark py-16 text-white sm:py-18 lg:py-22">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 space-y-2 text-center sm:mb-16">
            <h2 className="px-4 text-2xl font-bold tracking-tight text-white sm:px-0 sm:text-3xl md:text-4xl">
              Running Your Business Is Hard Enough
            </h2>
            <p className="px-4 text-lg text-white/80 sm:px-0 sm:text-xl">
              You shouldn&apos;t have to be a social media expert too
            </p>
          </div>

          <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
            <BentoCard className="flex flex-col items-center justify-center p-10 text-center">
              <ClockIcon className="text-primary mx-auto mb-4 h-10 w-10 sm:h-12 sm:w-12" />
              <h3 className="mb-3 text-xl font-semibold text-white sm:text-2xl sm:tracking-tight">No Time</h3>
              <p className="text-sm text-white/70 sm:text-base">
                Between appointments and admin work, who has time to create posts every day?
              </p>
            </BentoCard>
            <BentoCard className="flex flex-col items-center justify-center p-10 text-center">
              <ZapIcon className="text-primary mx-auto mb-4 h-10 w-10 sm:h-12 sm:w-12" />
              <h3 className="mb-3 text-xl font-semibold text-white sm:text-2xl sm:tracking-tight">No Skills</h3>
              <p className="text-sm text-white/70 sm:text-base">
                Creating engaging content and knowing when to post feels like a full-time job.
              </p>
            </BentoCard>
            <BentoCard className="flex flex-col items-center justify-center p-10 text-center">
              <TrendingUpIcon className="text-primary mx-auto mb-4 h-10 w-10 sm:h-12 sm:w-12" />
              <h3 className="mb-3 text-xl font-semibold text-white sm:text-2xl sm:tracking-tight">No Results</h3>
              <p className="text-sm text-white/70 sm:text-base">
                Posting randomly doesn&apos;t bring in new customers or grow your business.
              </p>
            </BentoCard>
          </div>
        </div>
      </div>
    </section>
  );
}
