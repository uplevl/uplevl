"use client";

import { AnimatePresence, type Variants, motion } from "motion/react";
import { useState } from "react";
import { useCopyToClipboard } from "react-use";

import { cn } from "@/lib/utils";

import { CheckIcon, CopyIcon } from "./icons";

const iconDraw = {
  hidden: { opacity: 0, rotate: 180, transition: { when: "afterChildren" } },
  visible: { opacity: 1, rotate: 0, transition: { when: "beforeChildren" } },
  exit: { opacity: 0, rotate: -180, transition: { when: "afterChildren" } },
} satisfies Variants;

const MotionCheckIcon = motion.create(CheckIcon);
const MotionCopyIcon = motion.create(CopyIcon);

type MailLinkProps = Omit<React.HTMLAttributes<HTMLButtonElement>, "children"> & {
  email: string;
};

export function MailLink({ className, email, ...props }: MailLinkProps) {
  const [isCopied, setIsCopied] = useState(false);
  const [, copyToClipboard] = useCopyToClipboard();

  function handleCopy() {
    if (isCopied) return;

    copyToClipboard(email);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  }

  return (
    <button
      {...props}
      className={cn(
        "bg-card inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-neutral-300 px-2 py-1 leading-none transition-colors duration-200 ease-out hover:border-neutral-500",
        className,
      )}
      onClick={handleCopy}
    >
      <span className="relative size-4">
        <AnimatePresence>
          {isCopied ? (
            <MotionCheckIcon
              key="check"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={iconDraw}
              color="var(--color-green-600)"
              className="absolute inset-0 size-4"
            />
          ) : (
            <MotionCopyIcon
              key="copy"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={iconDraw}
              className="absolute inset-0 size-4"
            />
          )}
        </AnimatePresence>
      </span>
      <span>{email}</span>
    </button>
  );
}
