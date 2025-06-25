import { useEffect, useRef, useState } from "react";

import { autoScrollToBottom, wait } from "@/lib/utils";

import { type ChatMessage } from "@/features/agent/types";

import useShowcaseContext from "./use-showcase-context";

function useShowcaseMessages(chatMessages: ChatMessage[]) {
  const { switchShowcase } = useShowcaseContext();
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const elementRef = useRef<HTMLDivElement>(null);

  function handleSendMessage(message: ChatMessage) {
    setMessages((prev) => {
      // Create a unique identifier for the message using role and content
      const messageKey = `${message.role}:${message.content}`;

      // Check if a message with the same role and content already exists
      const isDuplicate = prev.some(
        (existingMessage) => `${existingMessage.role}:${existingMessage.content}` === messageKey,
      );

      // Only add the message if it's not a duplicate
      if (!isDuplicate) {
        return [...prev, message];
      }

      return prev;
    });
  }

  function handleScrollToBottom() {
    const target = elementRef.current;
    if (!target) return;
    const parent = target.parentElement;
    if (!parent) return;

    autoScrollToBottom(target, parent);
  }

  useEffect(() => {
    async function addMessagesWithDelay() {
      try {
        for (const message of chatMessages) {
          handleSendMessage(message);
          await wait(message.delay);
        }

        await wait(3000);
        switchShowcase();
      } catch (error) {
        console.error("Error processing showcase messages:", error);
      }
    }

    if (messages.length === 0) {
      addMessagesWithDelay();
    }
  }, [chatMessages, switchShowcase, messages.length]);

  useEffect(() => {
    handleScrollToBottom();
  }, [messages.length]);

  return [messages, elementRef] as const;
}

export default useShowcaseMessages;
