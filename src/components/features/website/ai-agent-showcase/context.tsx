import { createContext, useState } from "react";

import { type Showcases } from "./types";

interface AIAgentShowcaseContextType {
  activeShowcase: Showcases;
  setActiveShowcase: (showcase: Showcases) => void;
  switchShowcase: () => void;
}

export const AIAgentShowcaseContext = createContext<AIAgentShowcaseContextType>({
  activeShowcase: "booking",
  setActiveShowcase: () => {},
  switchShowcase: () => {},
});

function AIAgentShowcaseProvider({ children }: { children: React.ReactNode }) {
  const [activeShowcase, setActiveShowcase] = useState<Showcases>("booking");

  function switchShowcase() {
    if (activeShowcase === "booking") {
      setActiveShowcase("question");
    }

    if (activeShowcase === "question") {
      setActiveShowcase("upsell");
    }

    if (activeShowcase === "upsell") {
      setActiveShowcase("loyalty");
    }

    if (activeShowcase === "loyalty") {
      setActiveShowcase("booking");
    }
  }

  return (
    <AIAgentShowcaseContext value={{ activeShowcase, setActiveShowcase, switchShowcase }}>
      {children}
    </AIAgentShowcaseContext>
  );
}

export default AIAgentShowcaseProvider;
