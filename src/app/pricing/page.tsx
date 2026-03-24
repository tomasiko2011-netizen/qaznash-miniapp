import Link from "next/link";
import { PageShell } from "@/components/page-shell";

const plans = [
  {
    name: "Разовый отчёт",
    price: "по запросу",
    note: "Для точечной проверки одной ниши или региона.",
  },
  {
    name: "Полный доступ",
    price: "через Telegram",
    note: "Когда нужен оборот, вложения, диаграммы и PDF в рабочем контуре бота.",
  },
  {
    name: "B2B пакет",
    price: "индивидуально",
    note: "Для агентств, аналитиков и команд, которым нужен отдельный контур доступа.",
  },
];

export default function PricingPage() {
  return (
    <PageShell
      title="Выберите подходящий формат доступа"
      lead="Сначала человек смотрит demo и понимает формат. Когда нужен рабочий отчёт, он переходит в Telegram и получает полный доступ по подходящему сценарию."
    >
      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <article key={plan.name} className="surface rounded-[32px] p-6 sm:p-8">
            <div className="kicker">QazNash</div>
            <h2 className="mt-3 text-2xl font-semibold">{plan.name}</h2>
            <p className="mt-2 text-3xl font-black text-[var(--accent)]">{plan.price}</p>
            <p className="mt-4 text-sm leading-6 text-[var(--muted)]">{plan.note}</p>
          </article>
        ))}
      </div>
      <div className="surface mt-6 rounded-[32px] p-6 sm:p-8">
        <h2 className="text-2xl font-semibold">Что входит в полный отчёт</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2 text-sm leading-6 text-[var(--muted)]">
          <p>Оценка оборота по налоговым данным, диапазон вложений, рекомендации и единый PDF с диаграммами.</p>
          <p>Детальная работа, повторные запросы, payment-status и staff-операционка остаются в QazNashBot.</p>
        </div>
        <Link href="/auth" className="cta-primary mt-6 inline-flex rounded-full px-5 py-3 text-sm font-semibold">Подключить Telegram</Link>
      </div>
      <div className="surface mt-6 rounded-[32px] p-6 sm:p-8">
        <div className="kicker">Частые вопросы</div>
        <div className="mt-4 space-y-4">
          <div className="rounded-[24px] border border-[var(--line)] bg-white/80 p-5">
            <h3 className="text-lg font-semibold">Можно ли сначала посмотреть пример?</h3>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Да, для этого и есть demo-экран: он показывает формат, но не открывает полный платный массив данных.</p>
          </div>
          <div className="rounded-[24px] border border-[var(--line)] bg-white/80 p-5">
            <h3 className="text-lg font-semibold">Где будет полный PDF?</h3>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Полный PDF формируется в QazNashBot. Это удобнее для дальнейшей работы и повторных запросов.</p>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
