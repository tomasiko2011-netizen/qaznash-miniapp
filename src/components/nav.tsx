import Link from "next/link";

const links = [
  { href: "/", label: "Главная" },
  { href: "/demo", label: "Демо" },
  { href: "/pricing", label: "Тарифы" },
  { href: "/auth", label: "Telegram" },
  { href: "/status", label: "Статус" },
];

export function Nav() {
  return (
    <header className="shell pt-6">
      <div className="surface flex items-center justify-between rounded-[28px] px-5 py-4 sm:px-7">
        <div>
          <div className="kicker">QazNash</div>
          <div className="display text-xl font-semibold">Mini App</div>
        </div>
        <nav className="flex flex-wrap justify-end gap-2 text-sm font-semibold text-[var(--muted)]">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="rounded-full px-4 py-2 transition hover:bg-white/80 hover:text-[var(--ink)]">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
