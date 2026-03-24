import { PageShell } from "@/components/page-shell";
import { TelegramStatusCard } from "@/components/telegram-status-card";

export default function StatusPage() {
  return (
    <PageShell
      title="Ваш статус доступа"
      lead="После Telegram-входа здесь видно, какой аккаунт привязан и куда перейти дальше, чтобы получить полный отчёт в QazNashBot."
    >
      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <TelegramStatusCard />
        <aside className="surface rounded-[32px] p-6 sm:p-8">
          <div className="kicker">Что дальше</div>
          <h2 className="mt-3 text-2xl font-semibold">Следующий шаг без путаницы</h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-[var(--muted)]">
            <li>Если нужен только формат — demo уже достаточно.</li>
            <li>Если нужен рабочий отчёт — переходим в бот по deep link.</li>
            <li>Там же остаются PDF, повторные запросы и операционная работа.</li>
          </ul>
        </aside>
      </div>
    </PageShell>
  );
}
