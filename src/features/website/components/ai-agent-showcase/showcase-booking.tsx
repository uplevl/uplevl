import { type ChatMessage } from "@/features/agent/types";

import ChatMessages from "./chat-messages";
import useShowcaseMessages from "./hooks/use-showcase-messages";

const chatMessages: ChatMessage[] = [
  {
    role: "agent",
    content: "Welcome! 👋 I'm Winston.",
    delay: 1000,
  },
  {
    role: "agent",
    content:
      "We have several openings available this week. Would you prefer an appointment in the morning or afternoon?",
    delay: 2000,
  },
  {
    role: "user",
    content: "Hi, I would like an appointment in the afternoon. This Friday if possible.",
    delay: 2000,
  },
  {
    role: "agent",
    content: "Great! We have a couple of afternoon slots available this Friday. How does 3:30 pm or 4:30 pm sound? 😊",
    delay: 2000,
  },
  {
    role: "user",
    content: "4:30 pm sounds perfect.",
    delay: 2000,
  },
  {
    role: "agent",
    content: "Awesome! To set up your profile, could I have your name and email, please? 😊",
    delay: 2500,
  },
  {
    role: "user",
    content: "My name is John Doe and my email is john.doe@example.com.",
    delay: 2500,
  },
  {
    role: "agent",
    content:
      "Perfect John! I've set up your appointment for Friday at 4:30 pm. You'll receive a confirmation email shortly.",
    delay: 3000,
  },
  {
    role: "user",
    content: "Thank you!",
    delay: 2000,
  },
  {
    role: "agent",
    content: "You're welcome! 😊 See you on Friday!",
    delay: 4000,
  },
] satisfies ChatMessage[];

export default function ShowcaseBooking() {
  const [messages, elementRef] = useShowcaseMessages(chatMessages);

  return (
    <>
      <ChatMessages messages={messages} />
      <div ref={elementRef} />
    </>
  );
}
