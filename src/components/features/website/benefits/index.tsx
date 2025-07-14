import { CheckCircleIcon, ClockIcon, MessageCircleIcon, StarIcon, TrendingUpIcon, ZapIcon } from "lucide-react";

export function Benefits() {
  return (
    <section
      id="features"
      className="from-background via-secondary/5 to-primary/10 bg-gradient-to-br py-12 sm:py-16 lg:py-20"
    >
      <div className="container mx-auto px-4 lg:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center sm:mb-16">
            <h2 className="mb-4 text-2xl font-bold sm:mb-6 sm:text-3xl md:text-4xl">More bookings, less work</h2>
            <p className="text-muted-foreground px-4 text-lg sm:px-0 sm:text-xl">
              See what happens when your social media actually works for your business
            </p>
          </div>

          {/* Bento Grid Layout */}
          <div className="grid auto-rows-fr grid-cols-1 gap-4 sm:gap-6 md:grid-cols-4 lg:grid-cols-6">
            {/* Large Feature Card - Save Time */}
            <div className="from-primary/10 to-primary/5 border-primary/20 rounded-2xl border bg-gradient-to-br p-6 shadow-sm transition-all duration-200 hover:shadow-md active:scale-[0.98] sm:p-8 sm:active:scale-100 md:col-span-2 md:row-span-2 lg:col-span-3">
              <div className="flex h-full flex-col justify-between">
                <div>
                  <div className="bg-primary/20 mb-6 flex h-12 w-12 items-center justify-center rounded-2xl sm:h-16 sm:w-16">
                    <ClockIcon className="text-primary h-6 w-6 sm:h-8 sm:w-8" />
                  </div>
                  <h3 className="mb-4 text-xl font-bold sm:text-2xl lg:text-3xl">Save 10+ Hours Weekly</h3>
                  <p className="text-muted-foreground mb-6 text-base leading-relaxed sm:text-lg">
                    No more spending evenings creating posts. Get your time back for what matters most to you and your
                    business.
                  </p>
                </div>
                <div className="bg-background/60 border-primary/10 rounded-xl border p-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                      <CheckCircleIcon className="h-4 w-4 text-green-600" />
                    </div>
                    <span className="text-sm font-medium">Automated posting & responses</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Medium Card - Increase Bookings */}
            <div className="bg-background border-muted rounded-2xl border p-6 shadow-sm transition-all duration-200 hover:shadow-md active:scale-[0.98] sm:active:scale-100 md:col-span-2 lg:col-span-2">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 sm:h-12 sm:w-12">
                <TrendingUpIcon className="h-5 w-5 text-green-600 sm:h-6 sm:w-6" />
              </div>
              <h3 className="mb-3 text-lg font-bold sm:text-xl">Increase Bookings</h3>
              <p className="text-muted-foreground text-sm sm:text-base">
                Consistent, professional posts attract more customers and showcase your best work.
              </p>
              <div className="mt-4 flex items-center space-x-2 rounded-lg bg-green-50 px-3 py-2 text-xs text-green-700">
                <span className="font-semibold">+40%</span>
                <span>average booking increase</span>
              </div>
            </div>

            {/* Tall Card - Never Miss Opportunities */}
            <div className="rounded-2xl border border-blue-200 bg-gradient-to-b from-blue-50 to-blue-100/50 p-6 shadow-sm transition-all duration-200 hover:shadow-md active:scale-[0.98] sm:active:scale-100 md:col-span-2 md:row-span-2 lg:col-span-1">
              <div className="flex h-full flex-col">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500">
                  <ZapIcon className="h-5 w-5 text-white" />
                </div>
                <h3 className="mb-3 text-lg font-bold text-blue-900">Never Miss Opportunities</h3>
                <p className="mb-6 flex-grow text-sm text-blue-800">
                  AI responds instantly to inquiries, even when you&apos;re busy with clients.
                </p>
                <div className="space-y-2">
                  <div className="rounded-lg border border-blue-200 bg-white/80 p-3">
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
                      <span className="text-xs font-medium text-blue-900">AI responding...</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Wide Card - Professional Presence */}
            <div className="bg-background border-muted rounded-2xl border p-6 shadow-sm transition-all duration-200 hover:shadow-md active:scale-[0.98] sm:active:scale-100 md:col-span-2 lg:col-span-3">
              <div className="flex items-start space-x-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-purple-100 sm:h-12 sm:w-12">
                  <StarIcon className="h-5 w-5 text-purple-600 sm:h-6 sm:w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-3 text-lg font-bold sm:text-xl">Professional Presence</h3>
                  <p className="text-muted-foreground mb-4 text-sm sm:text-base">
                    Look like the established business you are with consistent, quality content that builds trust.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-xs text-purple-700">
                      Brand Consistent
                    </span>
                    <span className="rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-xs text-purple-700">
                      Quality Content
                    </span>
                    <span className="rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-xs text-purple-700">
                      Builds Trust
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Medium Card - Better Customer Service */}
            <div className="rounded-2xl border border-orange-200 bg-gradient-to-br from-orange-50 to-orange-100/50 p-6 shadow-sm transition-all duration-200 hover:shadow-md active:scale-[0.98] sm:active:scale-100 md:col-span-2 lg:col-span-2">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 sm:h-12 sm:w-12">
                <MessageCircleIcon className="h-5 w-5 text-white sm:h-6 sm:w-6" />
              </div>
              <h3 className="mb-3 text-lg font-bold text-orange-900 sm:text-xl">Better Customer Service</h3>
              <p className="mb-4 text-sm text-orange-800 sm:text-base">
                Quick responses to questions and comments keep customers happy and engaged.
              </p>
              <div className="rounded-lg border border-orange-200 bg-white/80 p-3">
                <div className="text-xs">
                  <p className="mb-1 font-medium text-orange-900">Customer: &quot;Do you have availability?&quot;</p>
                  <p className="text-orange-700">🤖 &quot;Yes! I can check our schedule for you...&quot;</p>
                </div>
              </div>
            </div>

            {/* Square Card - Set It & Forget It */}
            <div className="rounded-2xl border border-green-200 bg-gradient-to-br from-green-50 to-emerald-100/50 p-6 shadow-sm transition-all duration-200 hover:shadow-md active:scale-[0.98] sm:active:scale-100 md:col-span-2 lg:col-span-1">
              <div className="flex h-full flex-col justify-center text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-500">
                  <CheckCircleIcon className="h-6 w-6 text-white" />
                </div>
                <h3 className="mb-3 text-lg font-bold text-green-900">Set It & Forget It</h3>
                <p className="text-sm text-green-800">
                  Once configured, Uplevl runs your social media completely hands-free.
                </p>
                <div className="mt-4 rounded-lg border border-green-200 bg-white/80 p-2">
                  <span className="text-xs font-medium text-green-700">✓ Fully Automated</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
