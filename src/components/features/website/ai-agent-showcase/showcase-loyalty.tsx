import { type ChatMessage } from "@/features/agent/types";

import ChatMessages from "./chat-messages";
import useShowcaseMessages from "./hooks/use-showcase-messages";

const chatMessages: ChatMessage[] = [
  {
    role: "agent",
    content: "You're all set — we've booked your service for Thursday at 10:00 am. 🚗",
    delay: 1000,
  },
  {
    role: "agent",
    content:
      "By the way, since this is your third visit this year, you've just unlocked a loyalty perk: a free tire rotation. 🎉",
    delay: 2500,
  },
  {
    role: "agent",
    content: "Would you like us to include that with your upcoming service? It helps extend the life of your tires.",
    delay: 2000,
  },
  {
    role: "user",
    content: "Oh nice — yeah, go ahead and add it.",
    delay: 2000,
  },
  {
    role: "agent",
    content:
      "Done! ✅ I've added the free tire rotation to your appointment. No charge — just a thank-you for sticking with us.",
    delay: 2500,
  },
  {
    role: "agent",
    content:
      "Also, just so you know — if you refer a friend this month, we'll give you both $20 off your next service. I can send you the referral link if you want it.",
    delay: 3000,
  },
  {
    role: "user",
    content: "Sure, send it over.",
    delay: 2000,
  },
  {
    role: "agent",
    content: "Here you go: [referral-link.com/johndoe] — just copy and share. 🙌",
    delay: 2500,
  },
  {
    role: "agent",
    content: "Thanks again for being one of our regulars! See you Thursday.",
    delay: 3000,
  },
] satisfies ChatMessage[];

export default function ShowcaseLoyalty() {
  const [messages, elementRef] = useShowcaseMessages(chatMessages);

  return (
    <>
      <ChatMessages messages={messages} />
      <div ref={elementRef} />
    </>
  );
}
