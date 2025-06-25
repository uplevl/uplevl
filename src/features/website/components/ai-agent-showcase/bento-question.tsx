import Image from "next/image";

import { cn } from "@/lib/utils";

import { BentoCardWhite } from "@/components/bento-card";

import iconQuestionColor from "@/assets/ai-agent-showcase/icon-question-color.png";
import iconQuestionGray from "@/assets/ai-agent-showcase/icon-question-gray.png";

import useShowcaseContext from "./hooks/use-showcase-context";
import Pipeline from "./pipeline";
import Pulse from "./pulse";

export default function BentoQuestion() {
  const { activeShowcase, setActiveShowcase } = useShowcaseContext();
  const active = activeShowcase === "question";

  return (
    <div className="relative">
      <BentoCardWhite active={active} onMouseEnter={() => setActiveShowcase("question")}>
        <div className="relative z-10 flex flex-col gap-4 pt-4 pr-7 pb-6">
          <div className="relative size-[80px]">
            <Image
              src={iconQuestionGray}
              alt="Question Gray"
              width={80}
              height={80}
              className={cn(
                "absolute inset-0 ml-6 size-[80px] transition-opacity duration-500",
                active ? "opacity-0" : "opacity-100",
              )}
            />
            <Image
              src={iconQuestionColor}
              alt="Question Color"
              width={72}
              height={75}
              className={cn(
                "absolute top-[4px] left-[4px] ml-6 h-[75px] w-[72px] transition-opacity duration-500",
                active ? "opacity-100" : "opacity-0",
              )}
            />
          </div>
          <div className="ml-7">
            <h3 className="mb-2 text-sm font-semibold">Question Answered</h3>
            <p className="text-sm text-neutral-800">
              The AI handles common inquiries in real-time, freeing up your team.
            </p>
          </div>
        </div>
        <Pulse active={active} className="translate-x-1/2 -translate-y-1/2" />
      </BentoCardWhite>
      <Pipeline className="-top-[35px] -right-[87px] w-[110px] -rotate-[48deg]" active={active} />
    </div>
  );
}
