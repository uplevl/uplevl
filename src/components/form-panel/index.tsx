interface FormPanelProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}

export function FormPanel({ title, description, children, actions }: FormPanelProps) {
  return (
    <section className="grid gap-6 sm:grid-cols-4 sm:gap-14">
      <header>
        <h2 className="text-lg font-semibold">{title}</h2>
        {description && <p className="text-muted-foreground text-xs leading-relaxed text-pretty">{description}</p>}
        {actions && <div className="mt-4">{actions}</div>}
      </header>
      <div className="col-span-3 grid grid-cols-2 gap-6">{children}</div>
    </section>
  );
}
