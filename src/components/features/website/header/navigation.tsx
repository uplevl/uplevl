"use client";

import dynamic from "next/dynamic";

import { cn } from "@/lib/utils";

import { useHeaderContext } from "./header.context";
import { NavigationItem } from "./navigation-item";

const NavigationCta = dynamic(() => import("./navigation-cta"), {
  ssr: false,
});

export function Navigation() {
  const { isOpen } = useHeaderContext();

  return (
    <nav
      id="navigation"
      data-open={isOpen}
      className={cn(
        "bg-background data-[open=true]:animate-in data-[open=false]:animate-out data-[open=false]:fade-out-0 data-[open=true]:fade-in-0 data-[open=false]:slide-out-to-top-2 data-[open=true]:slide-in-from-top-2 data-[open=true]:shadow-mobile-nav absolute inset-x-0 top-full z-40 flex w-full flex-1 flex-col gap-4 p-8 pt-4 transition-shadow duration-300 ease-in-out sm:relative sm:w-auto sm:flex-row sm:items-center sm:bg-transparent sm:p-0 sm:shadow-none sm:data-[open=true]:shadow-none",
        isOpen ? "flex" : "hidden sm:flex",
      )}
    >
      <NavigationItem href="#features">Features</NavigationItem>
      <NavigationItem href="#pricing">Pricing</NavigationItem>
      <div className="flex-1" />
      <NavigationCta />
    </nav>
  );
}
