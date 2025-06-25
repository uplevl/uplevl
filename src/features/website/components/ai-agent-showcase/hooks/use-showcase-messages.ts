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
      const messagesSet = new Set(prev);
      messagesSet.add(message);
      return Array.from(messagesSet);
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
      for (const message of chatMessages) {
        handleSendMessage(message);
        await wait(message.delay);
      }

      await wait(3000);
      switchShowcase();
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
