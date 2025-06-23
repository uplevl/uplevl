import { Spinner } from "@@/components/spinner";
import { Button, type ButtonProps } from "@@/components/ui/button";
import { cn } from "@@/lib/utils";

type LoadingButtonProps = ButtonProps & {
  isLoading?: boolean;
};

export function LoadingButton({ isLoading, children, className, disabled, ...props }: LoadingButtonProps) {
  return (
    <Button
      {...props}
      className={cn("relative", className)}
      aria-disabled={isLoading || disabled}
      aria-label={isLoading ? "Loading..." : undefined}
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
