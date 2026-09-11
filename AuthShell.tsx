import type { ReactNode } from "react";
import { SiteLayout } from "./SiteLayout";

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <SiteLayout>
      <div className="mx-auto w-full max-w-md px-5 py-16 lg:py-24">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-card sm:p-8">
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
          <div className="mt-7">{children}</div>
          <p className="mt-6 text-center text-sm text-muted-foreground">{footer}</p>
        </div>
      </div>
    </SiteLayout>
  );
}
