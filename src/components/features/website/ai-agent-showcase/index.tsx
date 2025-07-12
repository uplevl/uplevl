"use client";

import { lazy } from "react";

import { useIsMobile } from "@/hooks/use-mobile";

const AiAgentShowcaseContent = lazy(() => import("./content"));

export function AiAgentShowcase() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return null;
  }

  return <AiAgentShowcaseContent />;
}
