import { cn } from "@/lib/utils";

type SectionProps = React.HTMLAttributes<HTMLDivElement> & {
  slim?: boolean;
};

function Section({ children, className, slim, ...props }: SectionProps) {
  return (
    <section className={cn("py-20 sm:py-32", slim && "py-14 sm:py-18", className)} {...props}>
      <div className={cn("mx-auto w-full max-w-screen-2xl px-4 sm:px-8", slim && "max-w-screen-md")}>{children}</div>
    </section>
  );
}

function SectionHeader({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <header className={cn("mb-10 space-y-4 text-balance sm:mb-16", className)} {...props}>
      {children}
    </header>
  );
}

function SectionEyebrow({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <p className={cn("text-muted-foreground text-sm sm:text-center", className)} {...props}>
      {children}
    </p>
  );
}

function SectionTitle({
  children,
  className,
  as,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement> & { as?: string }) {
  const Comp = (as ?? "h2") as React.ElementType<React.HTMLAttributes<HTMLHeadingElement>>;

  return (
    <Comp
      className={cn(
        "sm:leading-tighter text-2xl leading-tight font-bold tracking-tight sm:mx-auto sm:max-w-[50%] sm:text-center sm:text-4xl",
        className,
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}

function SectionDescription({ children, className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-balance text-neutral-600 sm:mx-auto sm:max-w-[75%] sm:text-center sm:text-lg", className)}
      {...props}
    >
      {children}
    </p>
  );
}

function SectionContent({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("", className)} {...props}>
      {children}
    </div>
  );
}

export { Section, SectionHeader, SectionEyebrow, SectionTitle, SectionDescription, SectionContent };
