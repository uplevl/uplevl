import Image from "next/image";

import { cn } from "@/lib/utils";

import { BentoCardWhite } from "@/components/bento-card";

import iconBookingColor from "@/assets/ai-agent-showcase/icon-booking-color.png";
import iconBookingGray from "@/assets/ai-agent-showcase/icon-booking-gray.png";

import useShowcaseContext from "./hooks/use-showcase-context";
import Pipeline from "./pipeline";
import Pulse from "./pulse";

export default function BentoBooking() {
  const { activeShowcase, setActiveShowcase } = useShowcaseContext();
  const active = activeShowcase === "booking";

  return (
    <div className="relative">
      <BentoCardWhite active={active} onMouseEnter={() => setActiveShowcase("booking")}>
        <div className="relative z-10 flex flex-col gap-4 pt-4 pr-7 pb-6">
          <div className="relative size-[80px]">
            <Image
              src={iconBookingGray}
              alt="Booking Gray"
              width={80}
              height={80}
              className={cn(
                "absolute inset-0 ml-6 size-[80px] transition-opacity duration-500",
                active ? "opacity-0" : "opacity-100",
              )}
            />
            <Image
              src={iconBookingColor}
              alt="Booking Color"
              width={72}
              height={75}
              className={cn(
                "absolute top-[4px] left-[4px] ml-6 h-[75px] w-[72px] transition-opacity duration-500",
                active ? "opacity-100" : "opacity-0",
              )}
            />
          </div>
          <div className="ml-7">
            <h3 className="mb-2 text-sm font-semibold">New Bookings</h3>
            <p className="text-sm text-neutral-800">
              Turning website visitors into paying customers, automatically, 24/7.
            </p>
          </div>
        </div>
        <Pulse active={active} className="translate-x-1/2 -translate-y-1/5" />
      </BentoCardWhite>
      <Pipeline className="top-[44px] -right-[75px]" active={active} />
    </div>
  );
}
