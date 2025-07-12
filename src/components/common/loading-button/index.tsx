import { cn } from "@/lib/utils";

import { Spinner } from "@/components/common/spinner";
import { Button, type ButtonProps } from "@/components/ui/button";

type LoadingButtonProps = ButtonProps & {
  isLoading?: boolean;
};

export function LoadingButton({ isLoading, children, className, disabled, ...props }: LoadingButtonProps) {
  return (
    <Button
      {...props}
      className={cn("relative", className)}
      aria-label={isLoading ? "Loading..." : undefined}
      disabled={disabled || isLoading}
    >
      <span className={cn("relative z-0 flex h-full w-full items-center gap-2", isLoading && "opacity-0")}>
        {children}
      </span>
      {isLoading && (
        <span className="absolute inset-0 z-10 flex h-full w-full items-center justify-center">
          <Spinner className="size-4" />
        </span>
      )}
    </Button>
  );
}
