interface PageProps {
  children: React.ReactNode;
}

export function Page({ children }: PageProps) {
  return <article className="container mx-auto min-h-screen space-y-3 pr-8 pb-20 pl-4">{children}</article>;
}

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export function PageHeader({ title, description, children }: PageHeaderProps) {
  return (
    <header className="bg-background sticky top-0 z-10 mb-4 flex items-center justify-between gap-2 border-b pt-4 pb-3">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        {description && <p className="text-muted-foreground text-sm">{description}</p>}
      </div>
      {children}
    </header>
  );
}
