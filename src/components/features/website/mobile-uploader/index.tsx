import { ArrowRightIcon, CameraIcon, CheckCircleIcon, ClockIcon, ZapIcon } from "lucide-react";

import { BentoCardWhite } from "@/components/bento-card";
import { Eyebrow } from "@/components/eyebrow";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { IPhoneFrame } from "../iphone-frame";
import { NumberBullet } from "../number-bullet";
import { Waitlist } from "../waitlist";

export function MobileUploader() {
  return (
    <section className="from-background via-primary/5 to-secondary/10 bg-gradient-to-br py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
            {/* Left Column - Content */}
            <div className="space-y-6 sm:space-y-8">
              <Eyebrow>📱 Featured: Mobile Uploader</Eyebrow>

              {/* Headline */}
              <div className="space-y-4">
                <h2 className="text-2xl leading-tight font-bold tracking-tight sm:text-3xl lg:text-4xl">
                  From Property Photo to Professional Marketing Post In{" "}
                  <span className="text-primary">Under 30 Seconds</span>
                </h2>

                <p className="text-muted-foreground text-balance sm:text-lg">
                  No complicated software or design skills needed. Just snap a photo of your listing, add an optional
                  note about the property, and watch Uplevl create a compelling marketing post that attracts buyers.
                </p>
              </div>

              {/* Simple 3-Step Process */}
              <div className="space-y-6">
                <h3 className="mb-6 text-center text-lg font-semibold">It&apos;s really this simple:</h3>

                <div className="space-y-4">
                  {/* Step 1 */}
                  <BentoCardWhite className="flex items-center space-x-4 px-6 py-4">
                    <NumberBullet number={1} />
                    <div className="flex-1">
                      <h4 className="text-primary text-lg font-semibold">Upload</h4>
                      <p className="text-muted-foreground text-sm">Snap or choose property photos from your gallery</p>
                    </div>
                    <CameraIcon className="text-primary h-6 w-6" />
                  </BentoCardWhite>

                  {/* Arrow */}
                  <div className="flex justify-center">
                    <ArrowRightIcon className="text-primary h-5 w-5 rotate-90" />
                  </div>

                  {/* Step 2 */}
                  <BentoCardWhite className="flex items-center space-x-4 px-6 py-4">
                    <NumberBullet number={2} />
                    <div className="flex-1">
                      <h4 className="text-primary text-lg font-semibold">Generate</h4>
                      <p className="text-muted-foreground text-sm">
                        AI creates listing descriptions, hashtags & timing
                      </p>
                    </div>
                    <ZapIcon className="text-primary h-6 w-6" />
                  </BentoCardWhite>

                  {/* Arrow */}
                  <div className="flex justify-center">
                    <ArrowRightIcon className="text-primary h-5 w-5 rotate-90" />
                  </div>

                  {/* Step 3 */}
                  <BentoCardWhite className="flex items-center space-x-4 px-6 py-4">
                    <NumberBullet number={3} />
                    <div className="flex-1">
                      <h4 className="text-primary text-lg font-semibold">Schedule</h4>
                      <p className="text-muted-foreground text-sm">Post goes live when buyers are most active</p>
                    </div>
                    <ClockIcon className="text-primary h-6 w-6" />
                  </BentoCardWhite>
                </div>
              </div>

              {/* Key Benefits */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-center space-x-3 rounded-lg border border-green-200 bg-green-50 p-3">
                  <CheckCircleIcon className="h-5 w-5 flex-shrink-0 text-green-600" />
                  <span className="text-sm font-medium text-green-800">Works on any smartphone</span>
                </div>
                <div className="flex items-center space-x-3 rounded-lg border border-blue-200 bg-blue-50 p-3">
                  <CheckCircleIcon className="h-5 w-5 flex-shrink-0 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">No marketing experience needed</span>
                </div>
                <div className="flex items-center space-x-3 rounded-lg border border-purple-200 bg-purple-50 p-3">
                  <CheckCircleIcon className="h-5 w-5 flex-shrink-0 text-purple-600" />
                  <span className="text-sm font-medium text-purple-800">Upload multiple listings at once</span>
                </div>
                <div className="flex items-center space-x-3 rounded-lg border border-orange-200 bg-orange-50 p-3">
                  <CheckCircleIcon className="h-5 w-5 flex-shrink-0 text-orange-600" />
                  <span className="text-sm font-medium text-orange-800">Add property details if you want</span>
                </div>
              </div>

              {/* CTA */}
              <div className="pt-4">
                <Waitlist buttonLabel="Get Started Now" size="lg" />
              </div>
            </div>

            {/* Right Column - Phone Mockup */}
            <div className="relative">
              <div className="relative mx-auto flex max-w-sm justify-center sm:justify-end lg:max-w-md">
                {/* Phone Frame */}
                <IPhoneFrame>
                  {/* App Header */}
                  <div className="border-muted border-b px-6 py-4 pt-14">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg">
                          <span className="text-primary-foreground text-sm font-bold">U</span>
                        </div>
                        <span className="font-semibold">Property Uploader</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        New
                      </Badge>
                    </div>
                  </div>

                  {/* Upload Interface */}
                  <div className="space-y-6 px-6 py-6">
                    {/* Upload Area */}
                    <div className="relative">
                      <div className="from-primary/10 to-primary/5 border-primary/30 flex h-40 w-full flex-col items-center justify-center space-y-3 rounded-2xl border-2 border-dashed bg-gradient-to-br">
                        <CameraIcon className="text-primary/60 h-12 w-12" />
                        <div className="text-center">
                          <p className="text-primary text-sm font-medium">Tap to photo property</p>
                          <p className="text-muted-foreground text-xs">or choose from gallery</p>
                        </div>
                      </div>

                      {/* Upload buttons */}
                      <div className="mt-4 grid grid-cols-2 gap-3">
                        <Button size="sm" className="bg-primary text-primary-foreground">
                          <CameraIcon className="mr-2 h-4 w-4" />
                          Camera
                        </Button>
                        <Button size="sm" variant="outline">
                          <span className="mr-2">📁</span>
                          Gallery
                        </Button>
                      </div>
                    </div>

                    {/* Optional Note Section */}
                    <div className="space-y-3">
                      <label className="text-sm font-medium">Add property details (optional)</label>
                      <div className="relative">
                        <Input placeholder="e.g., 'Stunning 3BR with updated kitchen!'" className="text-sm" />
                        <div className="absolute top-1/2 right-3 -translate-y-1/2 transform">
                          <span className="text-muted-foreground text-xs">0/100</span>
                        </div>
                      </div>
                      <p className="text-muted-foreground text-xs">
                        This helps our AI create better listing descriptions
                      </p>
                    </div>

                    {/* Recent Uploads Preview */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-medium">Recent uploads</h4>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="relative">
                          <div className="bg-primary/20 aspect-square rounded-lg"></div>
                          <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-500">
                            <CheckCircleIcon className="h-3 w-3 text-white" />
                          </div>
                        </div>
                        <div className="relative">
                          <div className="bg-primary/20 aspect-square rounded-lg"></div>
                          <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500">
                            <ClockIcon className="h-3 w-3 text-white" />
                          </div>
                        </div>
                        <div className="bg-primary/10 border-primary/30 flex aspect-square items-center justify-center rounded-lg border-2 border-dashed">
                          <span className="text-primary/60 text-lg">+</span>
                        </div>
                      </div>
                      <div className="text-muted-foreground flex items-center space-x-2 text-xs">
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        <span>Posted</span>
                        <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                        <span>Scheduled</span>
                      </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="bg-muted/50 space-y-2 rounded-xl p-4">
                      <h4 className="text-sm font-medium">This week</h4>
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <div className="text-primary text-lg font-bold">12</div>
                          <div className="text-muted-foreground text-xs">Properties uploaded</div>
                        </div>
                        <div>
                          <div className="text-primary text-lg font-bold">8</div>
                          <div className="text-muted-foreground text-xs">Posts created</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </IPhoneFrame>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 animate-bounce rounded-full bg-green-500 px-3 py-1 text-xs font-medium text-white">
                  ✓ So easy!
                </div>
                {/* <div className="absolute -bottom-4 -left-4 rounded-full bg-blue-500 px-3 py-1 text-xs font-medium text-white">
                  📱 Works offline
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
