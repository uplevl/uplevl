import { cn } from "@/lib/utils";

interface PageProps {
  children: React.ReactNode;
  className?: string;
  simple?: boolean;
}

export function Page({ children, className, simple }: PageProps) {
  return (
    <article className={cn("min-h-screen space-y-4 pr-4 pb-20", simple && "mx-auto max-w-screen-lg", className)}>
      {children}
    </article>
  );
}

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  simple?: boolean;
}

export function PageHeader({ title, description, children, simple }: PageHeaderProps) {
  return (
    <div className={cn(!simple && "bg-background sticky top-0 z-10 pt-2")}>
      <header
        className={cn(
          !simple &&
            "bg-card mb-4 flex items-center justify-between gap-2 rounded-lg border border-neutral-200 px-4 py-4 shadow-sm sm:px-6 sm:py-6",
          simple && "py-16",
        )}
      >
        <div>
          <h1
            className={cn(
              "mb-1 text-2xl font-semibold tracking-tight",
              simple && "mb-2 text-2xl text-balance sm:text-4xl lg:text-5xl",
            )}
          >
            {title}
          </h1>
          {description && <p className="text-muted-foreground text-sm">{description}</p>}
        </div>
        {children}
      </header>
    </div>
  );
}
