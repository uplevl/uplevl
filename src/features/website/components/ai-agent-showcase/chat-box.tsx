import Image from "next/image";

import chatBackground from "@/assets/ai-agent-showcase/chat-background.png";
import chatInputBox from "@/assets/ai-agent-showcase/chat-input-box.png";

import useShowcaseContext from "./hooks/use-showcase-context";
import ShowcaseBooking from "./showcase-booking";
import ShowcaseLoyalty from "./showcase-loyalty";
import ShowcaseQuestion from "./showcase-question";
import ShowcaseUpsell from "./showcase-upsell";

function ChatBox() {
  const { activeShowcase } = useShowcaseContext();

  return (
    <div className="absolute top-2 -left-8 isolate flex aspect-[795/518] h-[518px] w-[795px] flex-col pt-[41px] pl-[49px]">
      <Image
        src={chatBackground}
        alt="background image"
        width={795}
        height={518}
        className="absolute inset-0 isolate z-[2] h-[518px] w-[795px]"
      />
      <div className="relative z-[3] mb-4 flex h-[332px] w-[500px] flex-col gap-3 overflow-y-auto pr-2">
        {activeShowcase === "booking" && <ShowcaseBooking />}
        {activeShowcase === "question" && <ShowcaseQuestion />}
        {activeShowcase === "upsell" && <ShowcaseUpsell />}
        {activeShowcase === "loyalty" && <ShowcaseLoyalty />}
      </div>
      <div className="relative">
        <Image src={chatInputBox} alt="chat input box" width={511} height={74} className="h-[74px] w-[511px]" />
      </div>
      <div className="bg-primary absolute bottom-0 left-0 z-0 size-[120px] blur-[200px]" />
    </div>
  );
}

export default ChatBox;
