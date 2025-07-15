"use client";

import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";

import { useHeaderContext } from "./header.context";

type NavigationItemProps = React.HTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: React.ReactNode;
  linkOnly?: boolean;
};

export function NavigationItem({ href, children, linkOnly = false, ...props }: NavigationItemProps) {
  const pathname = usePathname();
  const { toggleIsOpen } = useHeaderContext();

  function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
    // If the user is not on the home page, don't scroll to the content
    // but navigate to the href.
    if (pathname !== "/" && !href.startsWith("#")) {
      return;
    }

    event.preventDefault();

    toggleIsOpen(false);

    // If the link points to the home page, scroll to the top of the page.
    if (href === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // Scroll to the element with the id of the href.
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  }

  if (linkOnly) {
    return (
      <a href={href} onClick={handleClick} {...props}>
        {children}
      </a>
    );
  }

  return (
    <Button variant="ghost" asChild>
      <a href={href} className="text-sm" onClick={handleClick}>
        {children}
      </a>
    </Button>
  );
}
