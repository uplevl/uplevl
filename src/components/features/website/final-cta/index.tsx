import { CheckCircleIcon, ClockIcon, StarIcon } from "lucide-react";

import { BentoCardWhite } from "@/components/bento-card";
import { Eyebrow } from "@/components/eyebrow";

import { Waitlist } from "../waitlist";

export function FinalCTA() {
  return (
    <section className="from-primary/5 via-background to-primary/10 bg-gradient-to-br py-10 sm:py-14 lg:py-20">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="mx-auto max-w-4xl">
          {/* Main CTA Card */}
          <div className="space-y-8 p-8 text-center sm:p-12 lg:p-16">
            {/* Urgency Badge */}
            <Eyebrow className="bg-primary/10 border-primary/20 text-primary">
              Limited Early Access - Only 200 Spots Left
            </Eyebrow>
            {/* <div className="bg-primary/10 border-primary/30 inline-flex items-center space-x-2 rounded-full border px-4 py-2">
              <div className="bg-primary h-2 w-2 animate-pulse rounded-full"></div>
              <span className="text-primary text-sm font-medium">Limited Early Access - Only 200 Spots Left</span>
            </div> */}

            {/* Main Headline */}
            <div className="space-y-4 sm:mb-8 lg:mb-14">
              <h2 className="text-3xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
                Join 200+ smart business owners getting <span className="text-primary">early access to Uplevl</span>
              </h2>
              <p className="text-muted-foreground mx-auto max-w-3xl text-lg text-balance sm:text-xl">
                Be among the first to automate your social media and start getting more bookings while your competitors
                are still posting manually.
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="my-8 grid gap-6 sm:grid-cols-3">
              <BentoCardWhite className="p-6">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-500">
                  <span className="text-lg font-bold text-white">1</span>
                </div>
                <h3 className="mb-2 font-semibold text-green-800">First Access</h3>
                <p className="text-sm text-green-700">Get Uplevl before anyone else and start growing immediately</p>
              </BentoCardWhite>

              <BentoCardWhite className="p-6">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500">
                  <span className="text-lg font-bold text-white">50%</span>
                </div>
                <h3 className="mb-2 font-semibold text-blue-800">Early Bird Pricing</h3>
                <p className="text-sm text-blue-700">Lock in 50% off our regular pricing for your first year</p>
              </BentoCardWhite>

              <BentoCardWhite className="p-6">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-500">
                  <StarIcon className="h-6 w-6 text-white" />
                </div>
                <h3 className="mb-2 font-semibold text-purple-800">VIP Support</h3>
                <p className="text-sm text-purple-700">Direct line to our team for setup and optimization</p>
              </BentoCardWhite>
            </div>

            {/* Email Signup Form */}
            <div className="space-y-4 py-12">
              <h3 className="text-xl font-semibold">Reserve your spot now (it&apos;s completely free)</h3>

              <div className="mx-auto max-w-lg space-y-4">
                <Waitlist size="xl" buttonLabel="🚀 Join the Waitlist - Get Early Access" />
              </div>

              {/* Trust Indicators */}
              <div className="text-muted-foreground flex flex-col items-center justify-center gap-4 text-sm sm:flex-row sm:gap-8">
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="h-4 w-4 text-green-600" />
                  <span>100% Free to join</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="h-4 w-4 text-green-600" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="h-4 w-4 text-green-600" />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </div>

            {/* Social Proof */}
            <BentoCardWhite className="flex flex-col items-center justify-center gap-6 p-8 sm:flex-row">
              <div className="flex -space-x-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="bg-primary-light border-background h-10 w-10 rounded-full border-2"></div>
                ))}
                <div className="bg-primary border-background flex h-10 w-10 items-center justify-center rounded-full border-2">
                  <span className="text-primary-foreground text-xs font-bold">+</span>
                </div>
              </div>
              <div className="text-center sm:text-left">
                <p className="text-foreground font-semibold">Join Sarah, Mike, Lisa and 197+ other business owners</p>
                <p className="text-muted-foreground text-sm">who are already on the waitlist</p>
              </div>
            </BentoCardWhite>

            {/* Urgency Message */}
            <div className="rounded-2xl border border-orange-200 bg-gradient-to-r from-orange-50 to-red-50 p-6">
              <div className="mb-3 flex items-center justify-center space-x-2">
                <ClockIcon className="h-5 w-5 text-orange-600" />
                <span className="font-semibold text-orange-800">Limited Time Offer</span>
              </div>
              <p className="mx-auto max-w-2xl text-sm text-orange-700">
                We&apos;re only accepting 200 more businesses into our early access program. Once we hit capacity, the
                waitlist closes and you&apos;ll have to wait for our public launch in Q2 2025.
              </p>
            </div>

            {/* Final Reassurance */}
            <div className="space-y-3 text-center">
              <p className="text-muted-foreground">
                Questions? Email us at{" "}
                <a href="mailto:hello@uplevl.com" className="text-primary font-medium hover:underline">
                  hello@uplevl.com
                </a>
              </p>
              <div className="text-muted-foreground flex items-center justify-center space-x-4 text-xs">
                <span>🔒 Your email is safe with us</span>
                <span>•</span>
                <span>📧 No spam, ever</span>
                <span>•</span>
                <span>⚡ Instant confirmation</span>
              </div>
            </div>
          </div>

          {/* Bottom Stats */}
          <div className="mt-12 grid grid-cols-2 gap-6 text-center sm:grid-cols-4">
            <div className="space-y-2">
              <div className="text-primary text-2xl font-bold sm:text-3xl">200+</div>
              <div className="text-muted-foreground text-sm">Businesses Waiting</div>
            </div>
            <div className="space-y-2">
              <div className="text-primary text-2xl font-bold sm:text-3xl">2K+</div>
              <div className="text-muted-foreground text-sm">Posts Created</div>
            </div>
            <div className="space-y-2">
              <div className="text-primary text-2xl font-bold sm:text-3xl">40%</div>
              <div className="text-muted-foreground text-sm">Avg. Booking Increase</div>
            </div>
            <div className="space-y-2">
              <div className="text-primary text-2xl font-bold sm:text-3xl">10+</div>
              <div className="text-muted-foreground text-sm">Hours Saved Weekly</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
