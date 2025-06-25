import { cn } from "@/lib/utils";

type HeadingProps = React.HTMLAttributes<HTMLHeadingElement> & {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  small?: boolean;
};

export function Heading({ children, className, as, small, ...props }: HeadingProps) {
  const Comp = (as ?? "h2") as React.ElementType<React.HTMLAttributes<HTMLHeadingElement>>;

  return (
    <Comp
      className={cn("font-semibold tracking-tight", small ? "mt-5 text-xl" : "mt-10 text-2xl", className)}
      {...props}
    >
      {children}
    </Comp>
  );
}

export function List({ children, className, ...props }: React.HTMLAttributes<HTMLUListElement>) {
  return (
    <ul className={cn("list-disc space-y-3 pl-5", className)} {...props}>
      {children}
    </ul>
  );
}
