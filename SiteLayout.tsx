import type { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
          {eyebrow}
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-bold sm:text-5xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
          {description}
        </p>
      </div>
    </section>
  );
}
