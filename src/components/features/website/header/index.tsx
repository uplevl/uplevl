"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useToggle } from "react-use";

import logo from "@/assets/logo.svg";

import { HeaderContext } from "./header.context";
import { Navigation } from "./navigation";
import { NavigationItem } from "./navigation-item";
import { NavigationToggleButton } from "./navigation-toggle-button";

export function Header() {
  const [isOpen, toggleIsOpen] = useToggle(false);
  const pathname = usePathname();

  useEffect(() => {
    toggleIsOpen(false);
  }, [pathname, toggleIsOpen]);

  return (
    <HeaderContext value={{ isOpen, toggleIsOpen }}>
      <header className="bg-background/90 sticky inset-0 isolate z-50 backdrop-blur-sm">
        <div className="relative mx-auto flex w-full max-w-screen-2xl items-center gap-6 px-4 py-4 sm:px-8">
          <NavigationItem href="/" linkOnly>
            <Image src={logo} alt="Uplevl Logo" className="max-h-8 w-auto" priority />
          </NavigationItem>
          <NavigationToggleButton />
          <Navigation />
        </div>
      </header>
    </HeaderContext>
  );
}
