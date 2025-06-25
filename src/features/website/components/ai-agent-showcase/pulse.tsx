import { cn } from "@/lib/utils";

function PulseLine({ className, ...props }: Omit<React.HTMLAttributes<HTMLDivElement>, "children">) {
  return (
    <div
      className={cn(
        "absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border opacity-45 transition-transform duration-300 ease-in-out",
        className,
      )}
      {...props}
    />
  );
}

type PulseProps = React.ComponentProps<"div"> & {
  active?: boolean;
};

export default function Pulse({ active, className, ...props }: PulseProps) {
  return (
    <div className={cn("absolute top-0 right-0 z-[1] size-[150px]", className)} {...props}>
      <PulseLine className={cn("size-full", active && "animate-pulse-1")} />
      <PulseLine className={cn("size-[80%]", active && "animate-pulse-2")} />
      <PulseLine className={cn("size-[60%]", active && "animate-pulse-3")} />
    </div>
  );
}
