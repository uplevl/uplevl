"use client";

import { createContext, use } from "react";

interface HeaderContextType {
  isOpen: boolean;
  toggleIsOpen: (isOpen?: boolean) => void;
}

export const HeaderContext = createContext<HeaderContextType>({
  isOpen: false,
  toggleIsOpen: () => {},
});

export function useHeaderContext() {
  const context = use(HeaderContext);

  if (!context) {
    throw new Error("useHeaderContext must be used within a HeaderContext");
  }

  return context;
}
