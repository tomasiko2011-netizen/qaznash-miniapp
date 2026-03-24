import Link from "next/link";
import { PageShell } from "@/components/page-shell";

const botUrl = process.env.NEXT_PUBLIC_TELEGRAM_BOT_URL ?? "https://t.me/QazNashBot";

export default function HomePage() {
  return (
    <PageShell
      title="Быстрая оценка ниши в Казахстане"
      lead="Посмотрите demo-отчёт, поймите формат за минуту и перейдите в Telegram для подробного отчёта с PDF, диаграммами и рабочими сценариями."
    >
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <article className="surface rounded-[32px] p-6 sm:p-8">
          <div className="kicker">Как это работает</div>
          <div className="mt-5 stat-grid">
            {[
              ["1", "Выберите нишу", "Сначала человек понимает, подходит ли ему категория и регион."],
              ["2", "Посмотрите demo", "Видит безопасный пример без утечки платных данных."],
              ["3", "Подключите Telegram", "Быстро связывает себя с QazNashBot."],
              ["4", "Получите полный отчёт", "В боте уже доступны PDF, диаграммы и повторные запросы."],
            ].map(([step, title, text]) => (
              <div key={step} className="rounded-[26px] border border-[var(--line)] bg-white/80 p-5">
                <div className="text-sm font-black text-[var(--accent)]">Шаг {step}</div>
                <h2 className="mt-2 text-xl font-semibold">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{text}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/demo" className="cta-primary rounded-full px-5 py-3 text-sm font-semibold">Посмотреть demo</Link>
            <Link href="/pricing" className="cta-secondary rounded-full px-5 py-3 text-sm font-semibold">Посмотреть тарифы</Link>
          </div>
        </article>

        <aside className="surface rounded-[32px] p-6 sm:p-8">
          <div className="kicker">Для кого это</div>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-[var(--muted)]">
            <li>Для тех, кто выбирает нишу или новую локацию.</li>
            <li>Для предпринимателей, которым нужен быстрый ориентир по рынку.</li>
            <li>Для команд, которым важен единый PDF и понятный Telegram-flow.</li>
            <li>Для платной детальной аналитики без перегруженного первого касания.</li>
          </ul>
          <div className="mt-6 rounded-[28px] border border-[var(--line)] bg-[#244d43] p-5 text-white">
            <div className="text-sm uppercase tracking-[0.18em] text-white/60">Продолжение</div>
            <h2 className="mt-2 text-2xl font-semibold">Полный отчёт — в Telegram</h2>
            <p className="mt-2 text-sm leading-6 text-white/75">Когда нужен рабочий отчёт с PDF и диаграммами, пользователь продолжает уже в QazNashBot.</p>
            <a href={botUrl} className="mt-4 inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#244d43]">Перейти в бот</a>
          </div>
        </aside>
      </div>
      <section className="surface mt-6 rounded-[32px] p-6 sm:p-8">
        <div className="kicker">Что получает пользователь</div>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div className="rounded-[24px] border border-[var(--line)] bg-white/80 p-5">
            <h3 className="text-lg font-semibold">Понятный вход</h3>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Сначала demo и понятная ценность, без перегрузки командами и служебными экранами.</p>
          </div>
          <div className="rounded-[24px] border border-[var(--line)] bg-white/80 p-5">
            <h3 className="text-lg font-semibold">Рабочий отчёт</h3>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Дальше в Telegram пользователь получает полный отчёт с оборотом, вложениями и единым PDF.</p>
          </div>
          <div className="rounded-[24px] border border-[var(--line)] bg-white/80 p-5">
            <h3 className="text-lg font-semibold">Без лишнего риска</h3>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Demo не позволяет вытащить базу по кускам, а подробная аналитика остаётся в paid-контуре.</p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
