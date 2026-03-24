import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { TelegramAuthCard } from "@/components/telegram-auth-card";

const botUrl = process.env.NEXT_PUBLIC_TELEGRAM_BOT_URL ?? "https://t.me/QazNashBot";

export default function AuthPage() {
  return (
    <PageShell
      title="Авторизация через Telegram"
      lead="Подключите Telegram, чтобы mini app понял, какой аккаунт продолжит работу в QazNashBot."
    >
      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <TelegramAuthCard />
        <aside className="surface rounded-[32px] p-6 sm:p-8">
          <div className="kicker">Что это даёт</div>
          <h2 className="mt-3 text-2xl font-semibold">Один пользователь, один контур</h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-[var(--muted)]">
            <li>Связка mini app и бота через `telegram_id`.</li>
            <li>Понятный переход из Instagram-рекламы в Telegram без путаницы.</li>
            <li>После входа можно показать статус доступа и дальше вести человека в бот без лишних шагов.</li>
            <li>PDF и детальная аналитика всё равно остаются в QazNashBot.</li>
          </ul>
          <div className="mt-6 rounded-[28px] border border-[var(--line)] bg-white/80 p-5 text-sm leading-6 text-[var(--muted)]">
            После авторизации можно сразу проверить статус доступа и перейти в QazNashBot для полного отчёта.
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={botUrl} className="cta-primary rounded-full px-5 py-3 text-sm font-semibold">Открыть QazNashBot</a>
            <Link href="/pricing" className="cta-secondary rounded-full px-5 py-3 text-sm font-semibold">Вернуться к тарифам</Link>
          </div>
        </aside>
      </div>
    </PageShell>
  );
}
