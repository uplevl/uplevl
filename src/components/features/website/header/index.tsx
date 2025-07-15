"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useToggle } from "react-use";

import { useIsMobile } from "@/hooks/use-mobile";

import logo from "@/assets/logo.svg";

import { HeaderContext } from "./header.context";
import { Navigation } from "./navigation";
import { NavigationItem } from "./navigation-item";
import { NavigationToggleButton } from "./navigation-toggle-button";

const NavigationCta = dynamic(() => import("./navigation-cta"), {
  ssr: false,
});

export function Header() {
  const [isOpen, toggleIsOpen] = useToggle(false);
  const pathname = usePathname();
  const isMobile = useIsMobile();

  useEffect(() => {
    toggleIsOpen(false);
  }, [pathname, toggleIsOpen]);

  return (
    <HeaderContext value={{ isOpen, toggleIsOpen }}>
      <header className="bg-background/90 sticky inset-0 isolate z-50 backdrop-blur-sm">
        <div className="wrapper relative flex w-full items-center gap-6 py-4">
          <NavigationItem href="/" linkOnly>
            <Image src={logo} alt="Uplevl Logo" className="max-h-8 w-auto" priority />
          </NavigationItem>
          {isMobile && (
            <>
              <div className="flex-1" />
              <NavigationToggleButton />
            </>
          )}
          <Navigation />
          <NavigationCta />
        </div>
      </header>
    </HeaderContext>
  );
}
