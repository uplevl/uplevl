"use client";

import { AnimatePresence, type Variants, motion } from "motion/react";

import { CloseIcon, MenuIcon } from "@/components/icons";

import { useHeaderContext } from "./header.context";

export function NavigationToggleButton() {
  const { isOpen, toggleIsOpen } = useHeaderContext();

  const buttonDraw = {
    hidden: { opacity: 0, rotate: 180, transition: { when: "afterChildren" } },
    visible: { opacity: 1, rotate: 0, transition: { when: "beforeChildren" } },
    exit: { opacity: 0, rotate: -180, transition: { when: "afterChildren" } },
  } satisfies Variants;

  const MotionMenuIcon = motion.create(MenuIcon);
  const MotionCloseIcon = motion.create(CloseIcon);

  return (
    <button
      className="relative block size-8 p-1 md:hidden"
      aria-controls="navigation"
      aria-expanded={isOpen}
      onClick={() => toggleIsOpen()}
    >
      <AnimatePresence>
        {isOpen && (
          <MotionCloseIcon
            key="close"
            width={32}
            height={32}
            className="absolute inset-1 size-6 object-contain"
            variants={buttonDraw}
            initial="hidden"
            animate="visible"
            exit="exit"
          />
        )}
        {!isOpen && (
          <MotionMenuIcon
            key="menu"
            width={32}
            height={32}
            className="absolute inset-1 size-6 object-contain"
            variants={buttonDraw}
            initial="hidden"
            animate="visible"
            exit="exit"
          />
        )}
      </AnimatePresence>
      <span className="sr-only">Menu</span>
    </button>
  );
}
