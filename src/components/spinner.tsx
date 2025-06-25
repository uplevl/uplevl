"use client";

import { motion } from "motion/react";

import { cn } from "@/lib/utils";

import { LoaderIcon } from "@/components/icons";

interface SpinnerProps {
  className?: string;
}

const MotionLoaderIcon = motion.create(LoaderIcon);

export function Spinner({ className }: SpinnerProps) {
  return (
    <MotionLoaderIcon
      className={cn("size-4", className)}
      initial={{ rotate: 0 }}
      animate={{ rotate: 360 }}
      transition={{ duration: 0.75, repeat: Infinity, ease: "linear" }}
    />
  );
}
