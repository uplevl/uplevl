import { type ChatMessage } from "@/features/agent/types";

import ChatMessages from "./chat-messages";
import useShowcaseMessages from "./hooks/use-showcase-messages";

const chatMessages: ChatMessage[] = [
  {
    role: "agent",
    content: "Hi there! 👋 I'm Winston, I'm here to help!",
    delay: 1000,
  },
  {
    role: "user",
    content: "Hi Winston! Do you offer balayage?",
    delay: 2000,
  },
  {
    role: "agent",
    content: "Absolutely! We do balayage, highlights, full color, root touch-ups — you name it. 😊",
    delay: 2000,
  },
  {
    role: "user",
    content: "How long does a balayage take?",
    delay: 2000,
  },
  {
    role: "agent",
    content: "Usually around 2 to 3 hours, depending on your hair length and the style you're going for.",
    delay: 2500,
  },
  {
    role: "user",
    content: "And what's the price range?",
    delay: 2000,
  },
  {
    role: "agent",
    content:
      "Here's a quick overview:\n\n• Haircut: $55+\n\n• Balayage: $160+\n\n• Root Touch-Up: $70\n\n• Blowout: $45\n\nLet me know if you'd like full pricing or a recommendation based on your goals!",
    delay: 5000,
  },
  {
    role: "user",
    content: "Can I pick a stylist?",
    delay: 2000,
  },
  {
    role: "agent",
    content:
      "Yes! You can choose a stylist when booking — we have both senior and junior stylists depending on what you're looking for.",
    delay: 2500,
  },
  {
    role: "agent",
    content: "Would you like me to help check availability next? 💇‍♀️",
    delay: 4000,
  },
] satisfies ChatMessage[];

export default function ShowcaseQuestion() {
  const [messages, elementRef] = useShowcaseMessages(chatMessages);

  return (
    <>
      <ChatMessages messages={messages} />
      <div ref={elementRef} />
    </>
  );
}
