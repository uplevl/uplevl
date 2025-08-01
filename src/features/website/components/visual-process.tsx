import {
  ArrowRightIcon,
  CheckCircleIcon,
  ClockIcon,
  MessageCircleIcon,
  StarIcon,
  TrendingUpIcon,
  ZapIcon,
} from "lucide-react";
import Image from "next/image";

import { BentoCard } from "@/components/bento-card";
import { Button } from "@/components/ui/button";

import photoUploadImage from "@/assets/mobile-app-demo/photo-upload.png";
import postingCommentsImage from "@/assets/mobile-app-demo/posting-comments.png";
import postingDetailsImage from "@/assets/mobile-app-demo/posting-details.png";
import { IPhoneFrame } from "@/features/website/components/iphone-frame";
import NextStepArrow from "@/features/website/components/next-step-arrow";
import { NumberBullet } from "@/features/website/components/number-bullet";

export function VisualProcess() {
  return (
    <section id="how-it-works" className="section-dark py-12 sm:py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 space-y-2 text-center sm:mb-16">
            <h2 className="text-2xl font-semibold tracking-tight text-balance text-white sm:text-3xl md:text-4xl">
              From Property Photo to Professional Post in Minutes
            </h2>
            <p className="mx-auto max-w-3xl px-4 text-lg text-balance text-white/80 sm:px-0 sm:text-xl">
              No marketing experience needed. Just upload your property photos and watch Uplevl create engaging social
              content automatically.
            </p>
          </div>

          <div className="space-y-16 lg:space-y-24">
            {/* Step 1: Upload Photo */}
            <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
              <div className="order-2 space-y-6 lg:order-1">
                <div className="flex items-center space-x-4">
                  <NumberBullet number={1} />
                  <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                    Upload Your Property Photo
                  </h3>
                </div>

                <p className="text-lg leading-relaxed text-white/80">
                  Just closed on a beautiful home, staged a stunning listing, or hosted a successful open house? Snap a
                  photo like you normally do and upload it to Uplevl.
                  <br />
                  <span className="text-primary font-semibold"> That&apos;s literally all you need to do.</span>
                </p>

                <BentoCard className="p-6">
                  <h4 className="text-primary mb-3 font-semibold">Perfect for:</h4>
                  <div className="grid gap-3 text-sm text-white sm:grid-cols-2">
                    <div className="flex items-center space-x-2">
                      <CheckCircleIcon className="h-4 w-4 text-green-600" />
                      <span>New listings</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircleIcon className="h-4 w-4 text-green-600" />
                      <span>Open house events</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircleIcon className="h-4 w-4 text-green-600" />
                      <span>Sold properties</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircleIcon className="h-4 w-4 text-green-600" />
                      <span>Market updates</span>
                    </div>
                  </div>
                </BentoCard>
              </div>

              <div className="order-1 flex justify-center sm:justify-end lg:order-2">
                {/* Phone mockup showing photo upload */}
                <IPhoneFrame>
                  <Image src={photoUploadImage} alt="Property photo upload" className="h-full w-full object-cover" />
                </IPhoneFrame>
              </div>
            </div>

            {/* Arrow indicator */}
            <NextStepArrow />

            {/* Step 2: AI Creates Post */}
            <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
              <div className="flex justify-center sm:justify-start">
                {/* AI Processing mockup */}
                <IPhoneFrame>
                  <Image
                    src={postingDetailsImage}
                    alt="Real estate posting details"
                    className="h-full w-full object-cover"
                  />
                </IPhoneFrame>
              </div>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <NumberBullet number={2} />
                  <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                    AI Creates Compelling Property Content
                  </h3>
                </div>

                <p className="text-lg leading-relaxed text-white/80">
                  Our AI analyzes your property photo and creates captivating descriptions, adds relevant market
                  hashtags, and suggests the perfect time to post for maximum engagement.
                  <br />
                  <span className="text-primary font-semibold">
                    {" "}
                    It understands real estate and speaks to potential buyers and sellers.
                  </span>
                </p>

                <div className="grid gap-4 text-white sm:grid-cols-2">
                  <BentoCard className="p-6">
                    <div className="mb-2 flex items-center space-x-2">
                      <ZapIcon className="text-primary h-5 w-5" />
                      <h4 className="font-semibold">Property Descriptions</h4>
                    </div>
                    <p className="text-sm text-neutral-300">Compelling copy that highlights key features</p>
                  </BentoCard>
                  <BentoCard className="p-6">
                    <div className="mb-2 flex items-center space-x-2">
                      <TrendingUpIcon className="text-primary h-5 w-5" />
                      <h4 className="font-semibold">Market Hashtags</h4>
                    </div>
                    <p className="text-sm text-neutral-300">Tags that reach serious buyers and sellers</p>
                  </BentoCard>
                  <BentoCard className="p-6">
                    <div className="mb-2 flex items-center space-x-2">
                      <ClockIcon className="text-primary h-5 w-5" />
                      <h4 className="font-semibold">Optimal Timing</h4>
                    </div>
                    <p className="text-sm text-neutral-300">Posts when buyers are actively browsing</p>
                  </BentoCard>
                  <BentoCard className="p-6">
                    <div className="mb-2 flex items-center space-x-2">
                      <StarIcon className="text-primary h-5 w-5" />
                      <h4 className="font-semibold">Brand Professional</h4>
                    </div>
                    <p className="text-sm text-neutral-300">Maintains your trusted agent reputation</p>
                  </BentoCard>
                </div>
              </div>
            </div>

            {/* Arrow indicator */}
            <NextStepArrow />

            {/* Step 3: Auto-post and Handle Replies */}
            <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
              <div className="order-2 space-y-6 lg:order-1">
                <div className="flex items-center space-x-4">
                  <NumberBullet number={3} />
                  <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                    Auto-Post & Handle Buyer Inquiries
                  </h3>
                </div>

                <p className="text-lg leading-relaxed text-white/80">
                  Your post goes live at the perfect time, and when potential buyers comment or send messages, our AI
                  responds professionally with property details and scheduling information.
                  <span className="text-primary font-semibold"> You&apos;ll never miss a potential client again.</span>
                </p>

                <BentoCard className="p-6">
                  <h4 className="mb-4 text-lg font-semibold text-white">What happens automatically:</h4>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircleIcon className="mt-0.5 size-4 text-green-500" />
                      <div>
                        <p className="font-medium text-white">Posts at peak viewing times</p>
                        <p className="text-sm text-neutral-300">When serious buyers are actively searching online</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircleIcon className="mt-0.5 size-4 text-green-500" />
                      <div>
                        <p className="font-medium text-white">Responds to property inquiries</p>
                        <p className="text-sm text-neutral-300">
                          Professional responses with listing details and next steps
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircleIcon className="mt-0.5 size-4 text-green-500" />
                      <div>
                        <p className="font-medium text-white">Schedules showings</p>
                        <p className="text-sm text-neutral-300">
                          Turns interested comments into actual property viewings
                        </p>
                      </div>
                    </div>
                  </div>
                </BentoCard>

                <BentoCard className="p-6">
                  <div className="mb-2 flex items-center space-x-2">
                    <MessageCircleIcon className="text-primary h-5 w-5" />
                    <span className="text-primary font-semibold">Real AI Response Example:</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p className="text-neutral-300">
                      Buyer: &quot;Beautiful home! Is this still available? Can we see it this weekend?&quot;
                    </p>
                    <p className="text-white">
                      AI Reply: &quot;Thank you! Yes, this gorgeous property is still available. I&apos;d be happy to
                      show it to you this weekend. I have openings Saturday at 2pm or Sunday at 11am. You can reach me
                      at [your number] or I can send you my calendar link to book directly! 🏠✨&quot;
                    </p>
                  </div>
                </BentoCard>
              </div>

              <div className="order-1 flex justify-center sm:justify-end lg:order-2">
                {/* Social media feed mockup */}
                <IPhoneFrame>
                  <Image
                    src={postingCommentsImage}
                    alt="Real estate social engagement"
                    className="h-full w-full object-cover"
                  />
                </IPhoneFrame>
              </div>
            </div>
          </div>

          {/* Final CTA for this section */}
          <div className="mt-16 text-center lg:mt-24">
            <BentoCard className="px-6 py-12">
              <h3 className="mb-4 text-xl font-semibold tracking-tight text-white sm:text-2xl md:text-3xl">
                Ready to attract more qualified buyers?
              </h3>
              <p className="mx-auto mb-6 max-w-2xl text-balance text-white/80">
                Join 200+ real estate agents who are already saving 10+ hours per week and generating more leads with
                automated social media marketing.
              </p>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Get Early Access - Free
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Button>
            </BentoCard>
          </div>
        </div>
      </div>
    </section>
  );
}
