import { ReactNode } from "react";
import { Nav } from "@/components/nav";

export function PageShell({ title, lead, children }: { title: string; lead: string; children: ReactNode }) {
  return (
    <div className="pb-14">
      <Nav />
      <main className="shell pt-8">
        <section className="hero-card rounded-[36px] px-6 py-8 sm:px-10 sm:py-10">
          <p className="kicker">Instagram funnel + Telegram bot</p>
          <h1 className="display mt-3 text-4xl font-semibold sm:text-5xl">{title}</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-[var(--muted)] sm:text-lg">{lead}</p>
        </section>
        <section className="mt-6">{children}</section>
      </main>
    </div>
  );
}
