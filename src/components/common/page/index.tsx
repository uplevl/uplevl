import { cn } from "@/lib/utils";

interface PageProps {
  children: React.ReactNode;
  className?: string;
}

export function Page({ children, className }: PageProps) {
  return <article className={cn("min-h-screen space-y-4 px-4 pb-20 sm:px-6", className)}>{children}</article>;
}

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export function PageHeader({ title, description, children }: PageHeaderProps) {
  return (
    <div className="bg-background sticky top-0 z-10 -ml-4 pt-2 sm:-ml-6">
      <header className="bg-card mb-4 flex items-center justify-between gap-2 rounded-lg border border-neutral-200 px-4 py-4 shadow-sm sm:px-6 sm:py-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          {description && <p className="text-muted-foreground text-sm">{description}</p>}
        </div>
        {children}
      </header>
    </div>
  );
}
