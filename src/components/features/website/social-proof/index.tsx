import { Star, StarIcon } from "lucide-react";

export function SocialProof() {
  return (
    <section className="section-dark py-12 text-white sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-8 px-4 text-2xl font-bold text-white sm:mb-12 sm:px-0 sm:text-3xl md:text-4xl">
            Trusted by service businesses everywhere
          </h2>

          <div className="mb-8 grid gap-8 sm:mb-12 md:grid-cols-3">
            <div className="space-y-4 rounded-xl p-4 transition-colors active:bg-white/10">
              <div className="flex justify-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="fill-primary text-primary h-4 w-4 sm:h-5 sm:w-5" />
                ))}
              </div>
              <blockquote className="px-2 text-base italic sm:px-0 sm:text-lg">
                &quot;Finally, social media that doesn&apos;t stress me out. My bookings are up 40% since joining the
                beta.&quot;
              </blockquote>
              <cite className="text-xs text-white/70 sm:text-sm">— Sarah M., Hair Salon Owner</cite>
            </div>

            <div className="space-y-4 rounded-xl p-4 transition-colors active:bg-white/10">
              <div className="flex justify-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="fill-primary text-primary h-4 w-4 sm:h-5 sm:w-5" />
                ))}
              </div>
              <blockquote className="px-2 text-base italic sm:px-0 sm:text-lg">
                &quot;I get compliments on my posts all the time now. Customers think I hired a marketing team!&quot;
              </blockquote>
              <cite className="text-xs text-white/70 sm:text-sm">— Mike R., Auto Repair Shop</cite>
            </div>

            <div className="space-y-4 rounded-xl p-4 transition-colors active:bg-white/10">
              <div className="flex justify-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="fill-primary text-primary h-4 w-4 sm:h-5 sm:w-5" />
                ))}
              </div>
              <blockquote className="px-2 text-base italic sm:px-0 sm:text-lg">
                &quot;The AI responses are so natural, clients don&apos;t even know it&apos;s automated. Game
                changer!&quot;
              </blockquote>
              <cite className="text-xs text-white/70 sm:text-sm">— Lisa K., Med Spa Director</cite>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center space-y-6 text-white/70 sm:flex-row sm:space-y-0 sm:space-x-8">
            <div className="text-center">
              <div className="text-xl font-bold text-white sm:text-2xl">200+</div>
              <div className="text-xs sm:text-sm">Beta Users</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-white sm:text-2xl">2,000+</div>
              <div className="text-xs sm:text-sm">Posts Created</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-white sm:text-2xl">95%</div>
              <div className="text-xs sm:text-sm">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
