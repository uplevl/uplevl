"use client";

import BentoBooking from "./bento-booking";
import BentoLoyalty from "./bento-loyalty";
import BentoQuestion from "./bento-question";
import BentoUpsell from "./bento-upsell";
import ChatBox from "./chat-box";
import AIAgentShowcaseProvider from "./context";
import Intro from "./intro";

function AiAgentShowcase() {
  return (
    <AIAgentShowcaseProvider>
      <section className="hidden flex-col items-center px-4 sm:flex sm:px-0">
        <div className="mx-auto grid w-full max-w-[1200px] gap-4 sm:grid-cols-3 sm:grid-rows-3 sm:gap-14 sm:pr-18">
          <div className="sm:col-span-1 sm:row-span-1">
            <Intro />
          </div>
          <div className="relative z-[2] sm:col-span-2 sm:row-span-2">
            <ChatBox />
          </div>
          <div className="pt-2 sm:col-span-1 sm:row-span-1">
            <BentoBooking />
          </div>
          <div className="sm:col-span-1 sm:row-span-1">
            <BentoQuestion />
          </div>
          <div className="sm:col-span-1 sm:row-span-1">
            <BentoUpsell />
          </div>
          <div className="sm:col-span-1 sm:row-span-1">
            <BentoLoyalty />
          </div>
        </div>
      </section>
    </AIAgentShowcaseProvider>
  );
}

export default AiAgentShowcase;
