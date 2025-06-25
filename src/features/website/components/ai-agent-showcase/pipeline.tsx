import { cn } from "@/lib/utils";

type PipelineProps = React.ComponentProps<"div"> & {
  active?: boolean;
};

function Pipeline({ active, className, ...props }: PipelineProps) {
  return (
    <div
      {...props}
      className={cn(
        "right-100% absolute top-0 z-0 hidden h-[2px] w-[75px] transition-opacity duration-300 ease-out sm:block",
        active
          ? "animate-shimmer bg-shimmer via-primary/60 bg-linear-to-r from-neutral-300/20 from-40% via-50% to-neutral-300/20 to-60%"
          : "bg-neutral-300/20",
        className,
      )}
    />
  );
}

export default Pipeline;
