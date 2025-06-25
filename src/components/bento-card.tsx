import { cn } from "@/lib/utils";

type BentoCardWhiteProps = React.ComponentProps<"div"> & {
  active?: boolean;
};

function BentoCardWhite({ children, className, active, ...props }: BentoCardWhiteProps) {
  return (
    <div
      className={cn(
        "shadow-card relative z-[1] overflow-hidden rounded-lg bg-linear-to-b from-white transition-colors duration-500 ease-out",
        active ? "to-neutral-100 sm:to-yellow-50" : "to-neutral-100",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export { BentoCardWhite };
