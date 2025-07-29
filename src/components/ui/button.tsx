"use client";

import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import { usePostHog } from "posthog-js/react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive inline-flex shrink-0 items-center justify-center gap-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:ring-[3px] enabled:cursor-pointer aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "from-primary to-primary-light text-primary-foreground hover:to-primary border-primary border bg-linear-to-t shadow-xs transition-colors duration-200 ease-out",
        destructive:
          "bg-destructive hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 text-white shadow-xs",
        outline:
          "text-foreground hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 hover:bg-accent border bg-neutral-50",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-xs",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-8 px-4 py-2 has-[>svg]:px-3",
        sm: "h-6.5 gap-1.5 rounded-md px-3 text-xs has-[>svg]:pl-2",
        lg: "h-10 rounded-xl px-6 text-sm font-semibold has-[>svg]:px-4",
        xl: "h-12 rounded-2xl px-10 text-base font-semibold has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;
export type ButtonProps = React.ComponentProps<"button"> &
  ButtonVariants & { asChild?: boolean; "data-tracking-label"?: string };

function Button({
  className,
  variant,
  size,
  asChild = false,
  disabled,
  "data-tracking-label": trackingLabel,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  const posthog = usePostHog();

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    props.onClick?.(event);
    if (trackingLabel) {
      posthog.capture(trackingLabel);
    }
  }

  return (
    <Comp
      data-slot="button"
      aria-disabled={disabled}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
      onClick={handleClick}
    />
  );
}

export { Button, buttonVariants };
