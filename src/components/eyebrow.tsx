import { cn } from "@/lib/utils";

type EyebrowProps = React.HTMLAttributes<HTMLParagraphElement>;

function Eyebrow({ className, ...props }: EyebrowProps) {
  return (
    <p
      className={cn(
        "text-primary rounded-lg border border-neutral-200 bg-white px-3 py-1 text-sm font-medium",
        className,
      )}
      {...props}
    />
  );
}

export default Eyebrow;
