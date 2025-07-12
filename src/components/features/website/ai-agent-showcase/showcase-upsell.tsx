import { type ChatMessage } from "@/features/agent/types";

import ChatMessages from "./chat-messages";
import useShowcaseMessages from "./hooks/use-showcase-messages";

const chatMessages: ChatMessage[] = [
  {
    role: "agent",
    content: "Awesome — I've locked in your appointment for Friday at 2:00 pm! ✂️",
    delay: 1000,
  },
  {
    role: "agent",
    content:
      "Quick question before we're done: would you like to add a deep conditioning treatment to your visit? It's a salon favorite — especially for post-color care. 💆‍♀️",
    delay: 2500,
  },
  {
    role: "user",
    content: "Hmm, what's included?",
    delay: 2000,
  },
  {
    role: "agent",
    content:
      "Great question! It includes a nourishing hair mask, scalp massage, and heat infusion — adds shine and softness for weeks. Takes just 15 minutes.",
    delay: 2500,
  },
  {
    role: "agent",
    content: "It's just $25 extra, and we can do it right before your styling session. Would you like to add it on?",
    delay: 2000,
  },
  {
    role: "user",
    content: "Yeah, let's add it.",
    delay: 2000,
  },
  {
    role: "agent",
    content: "Perfect! I've added the deep conditioning treatment to your appointment. You're going to love it. 😍",
    delay: 2500,
  },
  {
    role: "agent",
    content: "That's everything for now — your booking confirmation will be sent shortly. See you Friday! 👋",
    delay: 3000,
  },
] satisfies ChatMessage[];

export default function ShowcaseUpsell() {
  const [messages, elementRef] = useShowcaseMessages(chatMessages);

  return (
    <>
      <ChatMessages messages={messages} />
      <div ref={elementRef} />
    </>
  );
}
