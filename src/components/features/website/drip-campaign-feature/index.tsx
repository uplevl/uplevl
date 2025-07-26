import { ArrowRightIcon, CheckCircleIcon, ClockIcon, StarIcon, TrendingUpIcon, ZapIcon } from "lucide-react";

import { BentoCard } from "@/components/bento-card";
import { Eyebrow } from "@/components/eyebrow";
import { Badge } from "@/components/ui/badge";

import { NumberBullet } from "../number-bullet";
import { Waitlist } from "../waitlist";

export function DripCampaignFeature() {
  return (
    <section className="section-dark py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="mx-auto max-w-6xl">
          {/* Section Header */}
          <div className="mb-12 text-center sm:mb-16">
            <Eyebrow className="border-purple-800 bg-purple-100 text-purple-800">
              🚀 Game Changer: Bulk Upload & Auto-Schedule
            </Eyebrow>

            <h2 className="mb-6 text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
              Upload All Your Listings Once, Market For <span className="text-primary">Weeks</span>
            </h2>

            <p className="mx-auto max-w-3xl text-lg text-balance text-white/80 sm:text-xl">
              The secret to consistent real estate marketing without the daily grind. Upload all your property photos at
              once, and Uplevl automatically spreads them out over time, keeping your listings visible even when
              you&apos;re swamped with showings and closings.
            </p>
          </div>

          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left Column - Content */}
            <div className="space-y-8">
              {/* Main Benefit */}
              <BentoCard className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-500">
                    <CheckCircleIcon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-primary mb-3 text-xl font-bold text-balance">
                      Upload 20 property photos today, market for the next month
                    </h3>
                    <p className="text-neutral-300">
                      Perfect for when you have multiple new listings or a productive photo shoot day: Upload all your
                      property photos in one batch, and let Uplevl handle the marketing. Your social media showcases
                      fresh listings even during your busiest closing weeks.
                    </p>
                  </div>
                </div>
              </BentoCard>

              {/* How It Works */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-white">Here&apos;s how it works:</h3>

                <div className="space-y-2">
                  <BentoCard className="flex items-start space-x-4 px-6 py-4">
                    <NumberBullet number={1} />
                    <div className="space-y-1">
                      <h4 className="text-primary text-lg font-semibold">Bulk Upload Your Property Photos</h4>
                      <p className="text-sm text-neutral-300">
                        Select multiple listing photos from your phone or camera — interior, exterior, neighborhood
                        shots, all at once
                      </p>
                    </div>
                  </BentoCard>

                  <BentoCard className="flex items-start space-x-4 px-6 py-4">
                    <NumberBullet number={2} />
                    <div className="space-y-1">
                      <h4 className="text-primary text-lg font-semibold">AI Creates Marketing Posts</h4>
                      <p className="text-sm text-neutral-300">
                        Each property gets compelling descriptions, market insights, and optimal posting times to
                        attract buyers
                      </p>
                    </div>
                  </BentoCard>

                  <BentoCard className="flex items-start space-x-4 px-6 py-4">
                    <NumberBullet number={3} />
                    <div className="space-y-1">
                      <h4 className="text-primary text-lg font-semibold">Auto-Schedule Across Time</h4>
                      <p className="text-sm text-neutral-300">
                        Posts spread out strategically — mix of listings, market updates, and neighborhood features to
                        keep buyers engaged
                      </p>
                    </div>
                  </BentoCard>
                </div>
              </div>

              {/* Key Benefits */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-purple-200 bg-purple-50 p-4">
                  <div className="mb-2 flex items-center space-x-2">
                    <ClockIcon className="h-5 w-5 text-purple-600" />
                    <h4 className="font-semibold text-purple-800">Save Hours Weekly</h4>
                  </div>
                  <p className="text-sm text-purple-700">One upload session replaces weeks of daily posting</p>
                </div>

                <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
                  <div className="mb-2 flex items-center space-x-2">
                    <TrendingUpIcon className="h-5 w-5 text-blue-600" />
                    <h4 className="font-semibold text-blue-800">Maximum Listing Exposure</h4>
                  </div>
                  <p className="text-sm text-blue-700">Properties stay visible to buyers, even during busy periods</p>
                </div>

                <div className="rounded-xl border border-orange-200 bg-orange-50 p-4">
                  <div className="mb-2 flex items-center space-x-2">
                    <ZapIcon className="h-5 w-5 text-orange-600" />
                    <h4 className="font-semibold text-orange-800">Perfect Market Timing</h4>
                  </div>
                  <p className="text-sm text-orange-700">AI posts when potential buyers are most active</p>
                </div>

                <div className="rounded-xl border border-green-200 bg-green-50 p-4">
                  <div className="mb-2 flex items-center space-x-2">
                    <StarIcon className="h-5 w-5 text-green-600" />
                    <h4 className="font-semibold text-green-800">Professional Presence</h4>
                  </div>
                  <p className="text-sm text-green-700">Buyers see you as consistently active and successful</p>
                </div>
              </div>
            </div>

            {/* Right Column - Visual Timeline */}
            <div className="relative">
              <div className="bg-background border-primary/20 rounded-3xl border p-6 shadow-2xl sm:p-8">
                <div className="mb-6 text-center">
                  <h3 className="mb-2 text-lg font-semibold">Your Marketing Campaign in Action</h3>
                  <p className="text-muted-foreground text-sm">
                    Upload 12 property photos today → Marketing for 4 weeks
                  </p>
                </div>

                {/* Timeline */}
                <div className="space-y-6">
                  {/* Week 1 */}
                  <div className="relative">
                    <div className="mb-3 flex items-center space-x-3">
                      <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-full">
                        <span className="text-primary-foreground text-xs font-bold">W1</span>
                      </div>
                      <h4 className="font-semibold">Week 1</h4>
                      <Badge variant="secondary" className="text-xs">
                        3 posts
                      </Badge>
                    </div>
                    <div className="ml-11 grid grid-cols-3 gap-2">
                      <div className="from-primary/30 to-primary/20 flex h-16 items-center justify-center rounded-lg bg-gradient-to-br">
                        <span className="text-xs font-medium">Mon</span>
                      </div>
                      <div className="from-primary/30 to-primary/20 flex h-16 items-center justify-center rounded-lg bg-gradient-to-br">
                        <span className="text-xs font-medium">Wed</span>
                      </div>
                      <div className="from-primary/30 to-primary/20 flex h-16 items-center justify-center rounded-lg bg-gradient-to-br">
                        <span className="text-xs font-medium">Fri</span>
                      </div>
                    </div>
                  </div>

                  {/* Week 2 */}
                  <div className="relative">
                    <div className="mb-3 flex items-center space-x-3">
                      <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-full">
                        <span className="text-primary-foreground text-xs font-bold">W2</span>
                      </div>
                      <h4 className="font-semibold">Week 2</h4>
                      <Badge variant="secondary" className="text-xs">
                        3 posts
                      </Badge>
                    </div>
                    <div className="ml-11 grid grid-cols-3 gap-2">
                      <div className="flex h-16 items-center justify-center rounded-lg bg-gradient-to-br from-blue-200 to-blue-100">
                        <span className="text-xs font-medium">Tue</span>
                      </div>
                      <div className="flex h-16 items-center justify-center rounded-lg bg-gradient-to-br from-blue-200 to-blue-100">
                        <span className="text-xs font-medium">Thu</span>
                      </div>
                      <div className="flex h-16 items-center justify-center rounded-lg bg-gradient-to-br from-blue-200 to-blue-100">
                        <span className="text-xs font-medium">Sat</span>
                      </div>
                    </div>
                  </div>

                  {/* Week 3 */}
                  <div className="relative">
                    <div className="mb-3 flex items-center space-x-3">
                      <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-full">
                        <span className="text-primary-foreground text-xs font-bold">W3</span>
                      </div>
                      <h4 className="font-semibold">Week 3</h4>
                      <Badge variant="secondary" className="text-xs">
                        3 posts
                      </Badge>
                    </div>
                    <div className="ml-11 grid grid-cols-3 gap-2">
                      <div className="flex h-16 items-center justify-center rounded-lg bg-gradient-to-br from-green-200 to-green-100">
                        <span className="text-xs font-medium">Mon</span>
                      </div>
                      <div className="flex h-16 items-center justify-center rounded-lg bg-gradient-to-br from-green-200 to-green-100">
                        <span className="text-xs font-medium">Wed</span>
                      </div>
                      <div className="flex h-16 items-center justify-center rounded-lg bg-gradient-to-br from-green-200 to-green-100">
                        <span className="text-xs font-medium">Fri</span>
                      </div>
                    </div>
                  </div>

                  {/* Week 4 */}
                  <div className="relative">
                    <div className="mb-3 flex items-center space-x-3">
                      <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-full">
                        <span className="text-primary-foreground text-xs font-bold">W4</span>
                      </div>
                      <h4 className="font-semibold">Week 4</h4>
                      <Badge variant="secondary" className="text-xs">
                        3 posts
                      </Badge>
                    </div>
                    <div className="ml-11 grid grid-cols-3 gap-2">
                      <div className="flex h-16 items-center justify-center rounded-lg bg-gradient-to-br from-purple-200 to-purple-100">
                        <span className="text-xs font-medium">Tue</span>
                      </div>
                      <div className="flex h-16 items-center justify-center rounded-lg bg-gradient-to-br from-purple-200 to-purple-100">
                        <span className="text-xs font-medium">Thu</span>
                      </div>
                      <div className="flex h-16 items-center justify-center rounded-lg bg-gradient-to-br from-purple-200 to-purple-100">
                        <span className="text-xs font-medium">Sun</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Summary */}
                <div className="border-muted mt-6 border-t pt-6">
                  <div className="space-y-2 text-center">
                    <div className="flex items-center justify-center space-x-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <div className="bg-primary h-3 w-3 rounded-full"></div>
                        <span className="text-muted-foreground">12 properties uploaded</span>
                      </div>
                      <ArrowRightIcon className="text-muted-foreground h-4 w-4" />
                      <div className="flex items-center space-x-2">
                        <div className="h-3 w-3 rounded-full bg-green-500"></div>
                        <span className="text-muted-foreground">4 weeks of marketing</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-xs">
                      All scheduled automatically • No daily work required
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Benefits */}
              <div className="absolute -top-4 -right-4 animate-pulse rounded-full bg-green-500 px-3 py-1 text-xs font-medium text-white">
                ⏰ Set & Forget
              </div>
              <div className="absolute -bottom-4 -left-4 rounded-full bg-blue-500 px-3 py-1 text-xs font-medium text-white">
                📈 Always Marketing
              </div>
            </div>
          </div>

          {/* Real-World Scenarios */}
          <div className="mt-16 lg:mt-20">
            <h3 className="mb-8 text-center text-xl font-semibold tracking-tight text-white sm:text-2xl md:text-3xl lg:text-4xl">
              Perfect For Real Estate Situations
            </h3>

            <div className="grid gap-6 md:grid-cols-3">
              <BentoCard className="px-8 py-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
                  <span className="text-2xl">🌸</span>
                </div>
                <h4 className="mb-3 font-semibold text-white">Spring Market Rush</h4>
                <p className="text-sm leading-relaxed text-white/70">
                  &quot;Before spring market hits, I upload photos from all my new listings. While I&apos;m busy with
                  showings and open houses, Uplevl keeps marketing my properties and attracting new buyers.&quot;
                </p>
                <div className="text-primary mt-4 text-xs font-medium">— Jennifer, Luxury Home Specialist</div>
              </BentoCard>

              <BentoCard className="px-8 py-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                  <span className="text-2xl">✈️</span>
                </div>
                <h4 className="mb-3 font-semibold text-white">Conference & Training</h4>
                <p className="text-sm leading-relaxed text-white/70">
                  &quot;Before attending the national real estate conference, I uploaded photos from recent listings and
                  neighborhood highlights. My social media stayed active the whole week, and I came back to several new
                  lead inquiries.&quot;
                </p>
                <div className="text-primary mt-4 text-xs font-medium">— David, Commercial Real Estate Agent</div>
              </BentoCard>

              <BentoCard className="px-8 py-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                  <span className="text-2xl">📸</span>
                </div>
                <h4 className="mb-3 font-semibold text-white">Photo Shoot Days</h4>
                <p className="text-sm leading-relaxed text-white/70">
                  &quot;Some days I do professional shoots for multiple properties. Instead of posting everything at
                  once, Uplevl spreads them out strategically so each listing gets proper attention from potential
                  buyers.&quot;
                </p>
                <div className="text-primary mt-4 text-xs font-medium">— Maria, Residential Sales Expert</div>
              </BentoCard>
            </div>
          </div>

          {/* CTA */}
          <BentoCard className="mt-8 space-y-6 px-8 py-12 text-center sm:mt-12 md:mt-14 lg:mt-18">
            <h3 className="text-xl font-semibold tracking-tight text-white md:text-2xl lg:text-3xl">
              Ready To Upload Once And Market Your Listings For Weeks?
            </h3>
            <p className="mx-auto max-w-2xl text-balance text-white/80">
              Join the waitlist to be among the first to experience bulk upload and auto-scheduling for real estate
              marketing. Focus on closing deals while we handle your online presence.
            </p>
            <Waitlist size="lg" buttonLabel="Get Early Access to Bulk Upload" />
          </BentoCard>
        </div>
      </div>
    </section>
  );
}
