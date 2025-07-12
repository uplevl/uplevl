import { use } from "react";

import { AIAgentShowcaseContext } from "../context";

function useShowcaseContext() {
  const context = use(AIAgentShowcaseContext);
  if (!context) {
    throw new Error("useShowcaseContext must be used within a AIAgentShowcaseProvider");
  }
  return context;
}

export default useShowcaseContext;
