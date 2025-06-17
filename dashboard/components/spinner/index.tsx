import { LoaderIcon } from "@@/components/icons";
import { cn } from "@@/lib/utils";

interface SpinnerProps {
  className?: string;
}

export function Spinner({ className }: SpinnerProps) {
  return <LoaderIcon className={cn("size-4 animate-spin", className)} />;
}
