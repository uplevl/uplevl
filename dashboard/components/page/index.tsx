import { cn } from "@@/lib/utils";

const defaultTitle = "Uplevl | Small Business Growth Engine";
const defaultDescription =
  "Uplevl is the all-in-one AI-powered marketing system that helps small businesses book more clients, save hours on admin, and grow faster—without lifting a finger.";
const defaultKeywords =
  "AI marketing for small business, small business automation, local SEO software, AI assistant for businesses, AI chatbot for website, automated social media marketing, appointment booking software, small business growth tools, digital marketing automation, business growth engine, AI-powered customer engagement, smart website assistant, AI marketing platform, Uplevl, small business AI system";

interface PageProps {
  htmlTitle?: string;
  htmlDescription?: string;
  htmlKeywords?: string;
  children: React.ReactNode;
}

export function Page({ htmlTitle, htmlDescription, htmlKeywords, children }: PageProps) {
  return (
    <>
      <title>{htmlTitle ? `${htmlTitle} - ${defaultTitle}` : defaultTitle}</title>
      <meta name="description" content={htmlDescription ?? defaultDescription} />
      <meta name="keywords" content={htmlKeywords ?? defaultKeywords} />
      <article className="container mx-auto min-h-screen space-y-3 px-4">{children}</article>
    </>
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
