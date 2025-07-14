import {
  ArrowRightIcon,
  CameraIcon,
  CheckCircleIcon,
  ClockIcon,
  MessageCircleIcon,
  StarIcon,
  TrendingUpIcon,
  ZapIcon,
} from "lucide-react";

import { BentoCard } from "@/components/bento-card";
import { Button } from "@/components/ui/button";

import { IPhoneFrame } from "../iphone-frame";
import NextStepArrow from "../next-step-arrow";
import { NumberBullet } from "../number-bullet";

export function VisualProcess() {
  return (
    <section id="how-it-works" className="section-dark py-12 sm:py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 space-y-2 text-center sm:mb-16">
            <h2 className="text-2xl font-semibold tracking-tight text-balance text-white sm:text-3xl md:text-4xl">
              From Photo to Professional Post in Minutes
            </h2>
            <p className="mx-auto max-w-3xl px-4 text-lg text-balance text-white/80 sm:px-0 sm:text-xl">
              No marketing experience needed. Just upload your work photos and watch Uplevl handle the rest
              automatically.
            </p>
          </div>

          <div className="space-y-16 lg:space-y-24">
            {/* Step 1: Upload Photo */}
            <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
              <div className="order-2 space-y-6 lg:order-1">
                <div className="flex items-center space-x-4">
                  <NumberBullet number={1} />
                  <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">Upload Your Work Photo</h3>
                </div>

                <p className="text-lg leading-relaxed text-white/80">
                  Just finished a great haircut, car repair, or spa treatment? Snap a photo like you normally do and
                  upload it to Uplevl.
                  <br />
                  <span className="text-primary font-semibold"> That&apos;s literally all you need to do.</span>
                </p>

                <BentoCard className="p-6">
                  <h4 className="text-primary mb-3 font-semibold">Perfect for:</h4>
                  <div className="grid gap-3 text-sm text-white sm:grid-cols-2">
                    <div className="flex items-center space-x-2">
                      <CheckCircleIcon className="h-4 w-4 text-green-600" />
                      <span>Before/after shots</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircleIcon className="h-4 w-4 text-green-600" />
                      <span>Finished work photos</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircleIcon className="h-4 w-4 text-green-600" />
                      <span>Behind-the-scenes</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircleIcon className="h-4 w-4 text-green-600" />
                      <span>Team photos</span>
                    </div>
                  </div>
                </BentoCard>
              </div>

              <div className="order-1 flex justify-center sm:justify-end lg:order-2">
                {/* Phone mockup showing photo upload */}
                <IPhoneFrame>
                  {/* Upload interface */}
                  <div className="flex h-full flex-col gap-4 px-6 py-4 pt-16 pb-8">
                    <h4 className="font-semibold">Upload New Photo</h4>

                    {/* Photo preview */}
                    <div className="relative">
                      <div className="from-primary/20 to-primary/10 border-primary/30 flex h-48 w-full items-center justify-center rounded-xl border-2 border-dashed bg-gradient-to-br">
                        <div className="text-center">
                          <CameraIcon className="text-primary/60 mx-auto mb-2 h-12 w-12" />
                          <p className="text-muted-foreground text-sm">Hair transformation photo</p>
                        </div>
                      </div>
                      <div className="absolute -top-2 -right-2 rounded-full bg-green-500 px-2 py-1 text-xs text-white">
                        ✓ Uploaded
                      </div>
                    </div>

                    {/* Recent uploads */}
                    <div className="space-y-2">
                      <p className="text-muted-foreground text-xs">Recent uploads:</p>
                      <div className="flex space-x-2">
                        <div className="bg-primary/20 h-12 w-12 rounded-lg"></div>
                        <div className="bg-primary/20 h-12 w-12 rounded-lg"></div>
                        <div className="bg-primary/20 h-12 w-12 rounded-lg"></div>
                      </div>
                    </div>

                    <div className="flex-1" />

                    {/* Upload button */}
                    <Button size="lg" className="w-full">
                      <CameraIcon className="mr-2 h-4 w-4" />
                      Take Another Photo
                    </Button>
                  </div>
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
                  {/* AI Processing */}
                  <div className="px-6 py-4 pt-16">
                    <div className="mb-4 flex items-center space-x-2">
                      <div className="bg-primary h-3 w-3 animate-pulse rounded-full"></div>
                      <span className="text-sm font-medium">AI Creating Your Post...</span>
                    </div>

                    {/* Generated post preview */}
                    <div className="bg-muted/70 space-y-3 rounded-xl p-4">
                      <div className="flex items-center space-x-2">
                        <div className="bg-primary/20 h-8 w-8 rounded-full"></div>
                        <div>
                          <div className="text-xs font-medium">Bella&apos;s Hair Studio</div>
                          <div className="text-muted-foreground text-xs">Draft post</div>
                        </div>
                      </div>

                      <div className="from-primary/20 to-primary/10 h-32 w-full rounded-lg bg-gradient-to-br"></div>

                      <div className="space-y-2">
                        <div className="text-xs">
                          <div className="bg-primary/10 mb-2 inline-block rounded px-2 py-1">
                            ✨ Fresh highlights bringing out those beautiful eyes! ✨
                          </div>
                        </div>
                        <div className="text-muted-foreground text-xs">
                          #hairgoals #highlights #transformation #beauty #salon
                        </div>
                      </div>
                    </div>

                    {/* AI suggestions */}
                    <div className="mt-4 space-y-2">
                      <p className="text-xs font-medium">AI Suggestions:</p>
                      <div className="space-y-1 text-xs">
                        <div className="rounded bg-green-50 px-2 py-1 text-green-700">✓ Best time to post: 6:30 PM</div>
                        <div className="rounded bg-blue-50 px-2 py-1 text-blue-700">✓ Added trending hashtags</div>
                        <div className="rounded bg-purple-50 px-2 py-1 text-purple-700">✓ Engaging caption created</div>
                      </div>
                    </div>
                  </div>
                </IPhoneFrame>
              </div>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <NumberBullet number={2} />
                  <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                    AI Creates Professional Content
                  </h3>
                </div>

                <p className="text-lg leading-relaxed text-white/80">
                  Our AI analyzes your photo and creates engaging captions, adds relevant hashtags, and even suggests
                  the perfect time to post.
                  <br />
                  <span className="text-primary font-semibold">
                    {" "}
                    It knows your industry and speaks to your customers.
                  </span>
                </p>

                <div className="grid gap-4 text-white sm:grid-cols-2">
                  <BentoCard className="p-6">
                    <div className="mb-2 flex items-center space-x-2">
                      <ZapIcon className="text-primary h-5 w-5" />
                      <h4 className="font-semibold">Smart Captions</h4>
                    </div>
                    <p className="text-sm text-neutral-300">Engaging copy that matches your brand voice</p>
                  </BentoCard>
                  <BentoCard className="p-6">
                    <div className="mb-2 flex items-center space-x-2">
                      <TrendingUpIcon className="text-primary h-5 w-5" />
                      <h4 className="font-semibold">Trending Tags</h4>
                    </div>
                    <p className="text-sm text-neutral-300">Hashtags that actually get you discovered</p>
                  </BentoCard>
                  <BentoCard className="p-6">
                    <div className="mb-2 flex items-center space-x-2">
                      <ClockIcon className="text-primary h-5 w-5" />
                      <h4 className="font-semibold">Perfect Timing</h4>
                    </div>
                    <p className="text-sm text-neutral-300">Posts when your audience is most active</p>
                  </BentoCard>
                  <BentoCard className="p-6">
                    <div className="mb-2 flex items-center space-x-2">
                      <StarIcon className="text-primary h-5 w-5" />
                      <h4 className="font-semibold">Brand Consistent</h4>
                    </div>
                    <p className="text-sm text-neutral-300">Maintains your unique business personality</p>
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
                    Auto-Post & Handle Replies
                  </h3>
                </div>

                <p className="text-lg leading-relaxed text-white/80">
                  Your post goes live at the perfect time, and when customers comment or send messages, our AI responds
                  professionally and naturally.
                  <span className="text-primary font-semibold"> You&apos;ll never miss a potential booking again.</span>
                </p>

                <BentoCard className="p-6">
                  <h4 className="mb-4 text-lg font-semibold text-white">What happens automatically:</h4>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircleIcon className="mt-0.5 size-4 text-green-500" />
                      <div>
                        <p className="font-medium text-white">Posts at optimal times</p>
                        <p className="text-sm text-neutral-300">
                          When your customers are most likely to see and engage
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircleIcon className="mt-0.5 size-4 text-green-500" />
                      <div>
                        <p className="font-medium text-white">Responds to comments</p>
                        <p className="text-sm text-neutral-300">Professional, friendly replies that sound like you</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircleIcon className="mt-0.5 size-4 text-green-500" />
                      <div>
                        <p className="font-medium text-white">Handles booking inquiries</p>
                        <p className="text-sm text-neutral-300">Turns interested comments into actual appointments</p>
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
                      Customer: &quot;Love this! Do you have any openings this week?&quot;
                    </p>
                    <p className="text-white">
                      AI Reply: &quot;Thank you! Yes, we have a few spots available this Thursday and Friday. Would you
                      like me to check our exact availability for you? You can call us at [your number] or book online!
                      😊&quot;
                    </p>
                  </div>
                </BentoCard>
              </div>

              <div className="order-1 flex justify-center sm:justify-end lg:order-2">
                {/* Social media feed mockup */}
                <IPhoneFrame>
                  {/* Live post with engagement */}
                  <div className="space-y-4 px-4 py-4 pt-16">
                    {/* Posted content */}
                    <div className="bg-muted space-y-3 rounded-xl p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="bg-primary/20 h-8 w-8 rounded-full"></div>
                          <div>
                            <div className="text-xs font-medium">Bella&apos;s Hair Studio</div>
                            <div className="text-muted-foreground text-xs">2 hours ago</div>
                          </div>
                        </div>
                        <div className="rounded-full bg-green-500 px-2 py-1 text-xs text-white">✓ Live</div>
                      </div>

                      <div className="from-primary/20 to-primary/10 h-24 w-full rounded-lg bg-gradient-to-br"></div>

                      <div className="text-xs">
                        <p className="mb-1 font-medium">✨ Fresh highlights bringing out those beautiful eyes! ✨</p>
                        <p className="text-muted-foreground">#hairgoals #highlights #transformation</p>
                      </div>

                      <div className="text-muted-foreground flex items-center justify-between text-xs">
                        <span>❤️ 24 likes</span>
                        <span>💬 5 comments</span>
                        <span>📤 2 shares</span>
                      </div>
                    </div>

                    {/* AI handling comments */}
                    <div className="space-y-3">
                      <div className="rounded-lg bg-blue-50 p-3">
                        <div className="mb-2 flex items-center space-x-2">
                          <div className="h-2 w-2 animate-pulse rounded-full bg-blue-500"></div>
                          <span className="text-xs font-medium text-blue-700">AI responding to comments...</span>
                        </div>

                        <div className="space-y-2 text-xs">
                          <div className="rounded bg-white p-2">
                            <p className="font-medium">Sarah_M: &quot;Gorgeous! Do you take walk-ins?&quot;</p>
                            <p className="mt-1 text-blue-600">
                              🤖 &quot;Thank you Sarah! We do accept walk-ins based on availability. I&apos;d recommend
                              calling ahead at (555) 123-4567 to check our current wait time. We&apos;d love to help you
                              achieve a similar look! 💕&quot;
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-lg bg-green-50 p-3">
                        <div className="mb-2 flex items-center space-x-2">
                          <CheckCircleIcon className="h-4 w-4 text-green-600" />
                          <span className="text-xs font-medium text-green-700">Potential booking identified!</span>
                        </div>
                        <p className="text-xs text-green-600">AI detected booking interest and provided contact info</p>
                      </div>
                    </div>
                  </div>
                </IPhoneFrame>
              </div>
            </div>
          </div>

          {/* Final CTA for this section */}
          <div className="mt-16 text-center lg:mt-24">
            <BentoCard className="px-6 py-12">
              <h3 className="mb-4 text-xl font-semibold tracking-tight text-white sm:text-2xl md:text-3xl">
                Ready to see this in action?
              </h3>
              <p className="mx-auto mb-6 max-w-2xl text-balance text-white/80">
                Join 200+ business owners who are already saving 10+ hours per week and increasing their bookings with
                automated social media.
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
