import Link from "next/link";
import { PageShell } from "@/components/page-shell";

export default function DemoPage() {
  return (
    <PageShell
      title="Посмотрите формат отчёта до покупки"
      lead="Демо показывает структуру и ключевые метрики. Полные финансовые оценки, PDF и диаграммы остаются в полном доступе через Telegram."
    >
      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="surface rounded-[32px] p-6 sm:p-8">
          <div className="kicker">Что видно бесплатно</div>
          <h2 className="mt-2 text-2xl font-semibold">Достаточно, чтобы понять ценность</h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-[var(--muted)]">
            <li>Регион и категория.</li>
            <li>Количество активных и благонадёжных компаний.</li>
            <li>Объём категории по Казахстану.</li>
            <li>Долю выбранного региона.</li>
            <li>Короткую сухую summary-строку.</li>
          </ul>
          <Link href="/auth" className="cta-primary mt-6 inline-flex rounded-full px-5 py-3 text-sm font-semibold">Продолжить через Telegram</Link>
        </section>

        <section className="surface rounded-[32px] p-6 sm:p-8">
          <div className="kicker">Пример</div>
          <div className="mt-3 rounded-[28px] bg-[#1f2f2b] p-6 text-white shadow-[0_18px_50px_rgba(31,47,43,0.25)]">
            <p>✅ Отчет готов.</p>
            <div className="mt-5 space-y-2 text-sm leading-6 text-white/90 sm:text-base">
              <p>📍 Регион: Астана</p>
              <p>🏷 Категория: Барбершопы</p>
              <p>📌 Количество активных и благонадёжных: 4435</p>
              <p>📊 По Казахстану в этой категории: 23846</p>
              <p>📈 Доля региона: 18.6%</p>
              <p className="pt-3 text-white/70">🧾 Это предпросмотр.</p>
              <p className="text-white/70">🔒 Полный отчет: оборот, вложения, диаграммы, PDF.</p>
            </div>
          </div>
        </section>
      </div>
      <section className="surface mt-6 rounded-[32px] p-6 sm:p-8">
        <div className="kicker">Что будет в полном отчёте</div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-[24px] border border-[var(--line)] bg-white/80 p-5 text-sm leading-6 text-[var(--muted)]">
            Оценка оборота по налоговым данным, диапазон вложений, рекомендации и диаграммы по регионам.
          </div>
          <div className="rounded-[24px] border border-[var(--line)] bg-white/80 p-5 text-sm leading-6 text-[var(--muted)]">
            После оплаты пользователь получает единый PDF и продолжает работу уже в Telegram-боте.
          </div>
        </div>
      </section>
    </PageShell>
  );
}
