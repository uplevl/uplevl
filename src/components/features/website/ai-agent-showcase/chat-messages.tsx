import { type ChatMessage } from "@/features/agent/types";

import { ChatBubbleAgent, ChatBubbleUser } from "./chat-bubbles";

interface ChatMessagesProps {
  messages: ChatMessage[];
}

function ChatMessages({ messages }: ChatMessagesProps) {
  return messages.map((message) => {
    if (message.role === "agent") {
      return <ChatBubbleAgent key={message.content} content={message.content} />;
    }

    return <ChatBubbleUser key={message.content} content={message.content} />;
  });
}

export default ChatMessages;
