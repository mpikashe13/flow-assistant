export function PageHeader({ title, description, icon: Icon }: { title: string; description: string; icon?: any }) {
  return (
    <div className="mb-6 flex items-start gap-4">
      {Icon && (
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--gradient-hero)] text-primary-foreground shadow-[var(--shadow-elegant)]">
          <Icon className="h-6 w-6" />
        </div>
      )}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{title}</h1>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </div>
    </div>
  );
}