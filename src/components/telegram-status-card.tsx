"use client";

import { useEffect, useState } from "react";

type TelegramUser = {
  id: number;
  first_name?: string;
  last_name?: string;
  username?: string;
};

type AccessStatus = {
  paid: boolean;
  access_type?: string;
  access_expires_at?: string;
};

const BOT_URL = process.env.NEXT_PUBLIC_TELEGRAM_BOT_URL ?? "https://t.me/QazNashBot";
const BOT_START_DEMO_URL = `${BOT_URL}?start=miniapp_demo`;
const BOT_START_STATUS_URL = `${BOT_URL}?start=miniapp_status`;

export function TelegramStatusCard() {
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [access, setAccess] = useState<AccessStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/session")
      .then((res) => res.json())
      .then(async (data) => {
        setUser(data?.user ?? null);
        if (data?.user?.id) {
          const statusRes = await fetch("/api/status/access");
          const statusData = await statusRes.json();
          if (statusData?.ok) {
            setAccess(statusData);
          }
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="surface rounded-[32px] p-6 sm:p-8">
        <p className="text-sm text-[var(--muted)]">Проверяем Telegram-сессию...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="surface rounded-[32px] p-6 sm:p-8">
        <div className="kicker">Нет сессии</div>
        <h2 className="mt-3 text-2xl font-semibold">Сначала авторизуйтесь через Telegram</h2>
        <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
          После входа мы покажем, какой Telegram-аккаунт привязан и куда нажать, чтобы продолжить работу в боте.
        </p>
        <a href="/auth" className="cta-primary mt-6 inline-flex rounded-full px-5 py-3 text-sm font-semibold">Перейти к авторизации</a>
      </div>
    );
  }

  const displayName = [user.first_name, user.last_name].filter(Boolean).join(" ") || user.username || `id ${user.id}`;

  return (
    <div className="surface rounded-[32px] p-6 sm:p-8">
      <div className="kicker">Статус доступа</div>
      <h2 className="mt-3 text-2xl font-semibold">{displayName}</h2>
      <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Telegram ID: {user.id}</p>
      {user.username && <p className="text-sm leading-6 text-[var(--muted)]">Username: @{user.username}</p>}

      <div className="mt-6 rounded-[28px] border border-[var(--line)] bg-white/85 p-5">
        <div className="text-sm font-semibold text-[var(--ink)]">Полный доступ к отчётам</div>
        <div className="mt-2 text-2xl font-black text-[var(--accent)]">{access?.paid ? "Активирован" : "Не активирован"}</div>
        {access?.access_type && <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Тип доступа: {access.access_type}</p>}
        {access?.access_expires_at && <p className="text-sm leading-6 text-[var(--muted)]">Действует до: {access.access_expires_at}</p>}
        <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
          Demo уже открыт на сайте. Для подробного отчёта, PDF и повторных запросов перейдите в QazNashBot.
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <a href={BOT_START_DEMO_URL} className="cta-primary rounded-full px-5 py-3 text-sm font-semibold">Продолжить в боте</a>
        <a href={BOT_START_STATUS_URL} className="cta-secondary rounded-full px-5 py-3 text-sm font-semibold">Проверить статус в боте</a>
        <a href="/pricing" className="cta-secondary rounded-full px-5 py-3 text-sm font-semibold">Посмотреть тарифы</a>
      </div>
    </div>
  );
}
