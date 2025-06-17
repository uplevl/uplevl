import { Helmet } from "react-helmet-async";

import { cn } from "@@/lib/utils";

interface PageProps {
  htmlTitle?: string;
  htmlDescription?: string;
  children: React.ReactNode;
}

export function Page({ htmlTitle, htmlDescription, children }: PageProps) {
  return (
    <article className="container mx-auto space-y-3 px-4">
      <Helmet>
        {htmlTitle && <title>{htmlTitle}</title>}
        {htmlDescription && <meta name="description" content={htmlDescription} />}
      </Helmet>
      {children}
    </article>
  );
}

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export function PageHeader({ title, description, children }: PageHeaderProps) {
  return (
    <header className={cn("flex items-center justify-between gap-2 pt-4", !description && "pb-5")}>
      <div>
        <h1 className="text-2xl leading-none font-semibold tracking-tight">{title}</h1>
        {description && <p className="text-muted-foreground text-sm">{description}</p>}
      </div>
      {children}
    </header>
  );
}
