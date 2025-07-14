import { cn } from "@/lib/utils";

export function Eyebrow({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <p
      className={cn(
        "inline-block rounded-2xl border border-neutral-200 px-3 py-2 text-xs font-semibold text-neutral-500 sm:mb-8 sm:px-4 sm:text-sm",
        className,
      )}
      {...props}
    />
  );
}
