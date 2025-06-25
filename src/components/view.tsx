import { cn } from "@/lib/utils";

type ViewProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
};

export default function View({ children, className, ...props }: ViewProps) {
  return (
    <div className={cn("flex-1 overflow-y-auto p-4 md:p-6", className)} {...props}>
      {children}
    </div>
  );
}
