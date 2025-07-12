import Image from "next/image";

import { cn } from "@/lib/utils";

import { BentoCardWhite } from "@/components/bento-card";

import iconLoyaltyColor from "@/assets/ai-agent-showcase/icon-loyalty-color.png";
import iconLoyaltyGray from "@/assets/ai-agent-showcase/icon-loyalty-gray.png";

import useShowcaseContext from "./hooks/use-showcase-context";
import Pipeline from "./pipeline";
import Pulse from "./pulse";

export default function BentoLoyalty() {
  const { activeShowcase, setActiveShowcase } = useShowcaseContext();
  const active = activeShowcase === "loyalty";

  return (
    <div className="relative">
      <BentoCardWhite active={active} onMouseEnter={() => setActiveShowcase("loyalty")}>
        <div className="relative z-10 flex flex-col gap-4 pt-4 pr-7 pb-6">
          <div className="relative size-[80px]">
            <Image
              src={iconLoyaltyGray}
              alt="Loyalty Gray"
              width={80}
              height={80}
              className={cn(
                "absolute inset-0 ml-6 size-[80px] transition-opacity duration-500",
                active ? "opacity-0" : "opacity-100",
              )}
            />
            <Image
              src={iconLoyaltyColor}
              alt="Loyalty Color"
              width={72}
              height={75}
              className={cn(
                "absolute top-[4px] left-[4px] ml-6 h-[75px] w-[72px] transition-opacity duration-500",
                active ? "opacity-100" : "opacity-0",
              )}
            />
          </div>
          <div className="ml-7">
            <h3 className="mb-2 text-sm font-semibold">Loyalty Perk Unlocked</h3>
            <p className="text-sm text-neutral-800">
              Delight repeat customers with automated rewards, promos, or referral bonuses.
            </p>
          </div>
        </div>
        <Pulse active={active} className="right-1/2 -translate-y-1/2" />
      </BentoCardWhite>
      <Pipeline className="-top-[55px] left-[37px] w-[110px] -rotate-90" active={active} />
    </div>
  );
}
