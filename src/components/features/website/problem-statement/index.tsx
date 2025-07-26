import { ClockIcon, TrendingUpIcon, ZapIcon } from "lucide-react";

import { BentoCard } from "@/components/bento-card";

export function ProblemStatement() {
  return (
    <section className="section-dark py-16 text-white sm:py-18 lg:py-22">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 space-y-2 text-center sm:mb-16">
            <h2 className="px-4 text-2xl font-bold tracking-tight text-white sm:px-0 sm:text-3xl md:text-4xl">
              Selling Real Estate Is Your Expertise
            </h2>
            <p className="px-4 text-lg text-white/80 sm:px-0 sm:text-xl">
              Social media marketing shouldn&apos;t be another full-time job
            </p>
          </div>

          <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
            <BentoCard className="flex flex-col items-center justify-center p-10 text-center">
              <ClockIcon className="text-primary mx-auto mb-4 h-10 w-10 sm:h-12 sm:w-12" />
              <h3 className="mb-3 text-xl font-semibold text-white sm:text-2xl sm:tracking-tight">No Time</h3>
              <p className="text-sm text-white/70 sm:text-base">
                Between showings, closings, and prospecting, when do you have time to create daily social content?
              </p>
            </BentoCard>
            <BentoCard className="flex flex-col items-center justify-center p-10 text-center">
              <ZapIcon className="text-primary mx-auto mb-4 h-10 w-10 sm:h-12 sm:w-12" />
              <h3 className="mb-3 text-xl font-semibold text-white sm:text-2xl sm:tracking-tight">No Strategy</h3>
              <p className="text-sm text-white/70 sm:text-base">
                Knowing what content converts browsers into buyers requires marketing expertise you don&apos;t have.
              </p>
            </BentoCard>
            <BentoCard className="flex flex-col items-center justify-center p-10 text-center">
              <TrendingUpIcon className="text-primary mx-auto mb-4 h-10 w-10 sm:h-12 sm:w-12" />
              <h3 className="mb-3 text-xl font-semibold text-white sm:text-2xl sm:tracking-tight">No Leads</h3>
              <p className="text-sm text-white/70 sm:text-base">
                Random listing posts don&apos;t build trust or generate the qualified leads your business needs.
              </p>
            </BentoCard>
          </div>
        </div>
      </div>
    </section>
  );
}
