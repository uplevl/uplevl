import { cn } from "@/lib/utils";

export function BentoCardWhite({ children, className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "z-0 rounded-2xl bg-white/50 shadow-[inset_0px_1px_1px_rgba(255,255,255,0.2),inset_0px_-1px_1px_rgba(255,255,255,0.1),inset_0_0_16px_rgba(255,255,255,0.1),0_15px_20px_rgba(0,0,0,0.1)] backdrop-blur-sm transition-[box-shadow,background-color] duration-300 ease-out hover:z-10 hover:bg-white/75 hover:shadow-[inset_0px_1px_1px_rgba(255,255,255,0.4),inset_0px_-1px_1px_rgba(255,255,255,0.15),inset_0_0_12px_rgba(255,255,255,0.1),0_20px_80px_rgba(0,0,0,0.2)]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function BentoCard({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "z-0 rounded-2xl bg-white/7 shadow-[inset_0px_1px_1px_rgba(255,255,255,0.2),inset_0px_-1px_1px_rgba(255,255,255,0.1),inset_0_0_16px_rgba(255,255,255,0.1),0_15px_20px_rgba(0,0,0,0.1)] backdrop-blur-sm transition-[box-shadow,background-color] duration-300 ease-out hover:z-10 hover:bg-white/12 hover:shadow-[inset_0px_1px_1px_rgba(255,255,255,0.4),inset_0px_-1px_1px_rgba(255,255,255,0.15),inset_0_0_12px_rgba(255,255,255,0.1),0_20px_80px_rgba(0,0,0,0.4)]",
        className,
      )}
      {...props}
    />
  );
}
