import { CheckCircleIcon } from "lucide-react";
import Image from "next/image";

export function SolutionStatement() {
  return (
    <section className="from-background via-secondary/5 to-primary/10 bg-gradient-to-br py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="order-2 space-y-6 sm:space-y-8 lg:order-1">
              <div className="space-y-2">
                <h2 className="text-2xl leading-tight font-bold tracking-tight text-balance sm:text-3xl md:text-4xl">
                  What If Your Real Estate Marketing Could Run Itself?
                </h2>

                <p className="text-muted-foreground sm:text-lg">
                  Uplevl uses AI to transform your property photos into compelling social content and automatically
                  engage with potential buyers. You focus on closing deals, we handle building your online presence.
                </p>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <div className="active:bg-muted/30 flex items-start space-x-3 rounded-lg p-3 transition-colors sm:space-x-4 sm:p-0 sm:active:bg-transparent">
                  <CheckCircleIcon className="text-primary mt-1 h-5 w-5 flex-shrink-0 sm:h-6 sm:w-6" />
                  <div>
                    <h4 className="mb-1 text-sm font-semibold sm:text-base">
                      Upload property photos, get marketing posts
                    </h4>
                    <p className="text-muted-foreground text-sm sm:text-base">
                      AI creates engaging listing content and market updates from your property photos
                    </p>
                  </div>
                </div>

                <div className="active:bg-muted/30 flex items-start space-x-3 rounded-lg p-3 transition-colors sm:space-x-4 sm:p-0 sm:active:bg-transparent">
                  <CheckCircleIcon className="text-primary mt-1 h-5 w-5 flex-shrink-0 sm:h-6 sm:w-6" />
                  <div>
                    <h4 className="mb-1 text-sm font-semibold sm:text-base">Smart scheduling for maximum exposure</h4>
                    <p className="text-muted-foreground text-sm sm:text-base">
                      Posts go live when potential buyers and sellers are most active online
                    </p>
                  </div>
                </div>

                <div className="active:bg-muted/30 flex items-start space-x-3 rounded-lg p-3 transition-colors sm:space-x-4 sm:p-0 sm:active:bg-transparent">
                  <CheckCircleIcon className="text-primary mt-1 h-5 w-5 flex-shrink-0 sm:h-6 sm:w-6" />
                  <div>
                    <h4 className="mb-1 text-sm font-semibold sm:text-base">AI responds to inquiries and comments</h4>
                    <p className="text-muted-foreground text-sm sm:text-base">
                      Never miss a potential lead or client question about your listings
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative order-1 lg:order-2">
              <Image
                src="/placeholder.svg?height=400&width=500"
                alt="Uplevl dashboard showing automated social media posts"
                width={500}
                height={400}
                className="h-auto w-full rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
