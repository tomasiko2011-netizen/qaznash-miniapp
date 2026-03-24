"use client";

import { useEffect, useMemo, useState } from "react";

type TelegramUser = {
  id: number;
  first_name?: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date?: number;
  hash?: string;
};

declare global {
  interface Window {
    onTelegramAuth?: (user: TelegramUser) => void;
  }
}

const BOT_NAME = process.env.NEXT_PUBLIC_TELEGRAM_BOT_NAME ?? "QazNashBot";
const BOT_URL = process.env.NEXT_PUBLIC_TELEGRAM_BOT_URL ?? "https://t.me/QazNashBot";

export function TelegramAuthCard() {
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let mounted = true;

    fetch("/api/auth/session")
      .then((res) => res.json())
      .then((data) => {
        if (mounted && data?.user) {
          setUser(data.user);
          setStatus("ok");
        }
      })
      .catch(() => undefined);

    window.onTelegramAuth = async (telegramUser: TelegramUser) => {
      setStatus("loading");
      setError("");
      try {
        const response = await fetch("/api/auth/telegram", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(telegramUser),
        });
        const data = await response.json();
        if (!response.ok || !data.ok) {
          throw new Error(data.error ?? "telegram_auth_failed");
        }
        setUser(data.user);
        setStatus("ok");
        window.location.href = "/status";
      } catch (err) {
        setStatus("error");
        setError(err instanceof Error ? err.message : "telegram_auth_failed");
      }
    };

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://telegram.org/js/telegram-widget.js?22";
    script.setAttribute("data-telegram-login", BOT_NAME);
    script.setAttribute("data-size", "large");
    script.setAttribute("data-radius", "14");
    script.setAttribute("data-userpic", "false");
    script.setAttribute("data-request-access", "write");
    script.setAttribute("data-onauth", "onTelegramAuth(user)");

    const holder = document.getElementById("telegram-login-slot");
    if (holder && holder.childElementCount === 0) {
      holder.appendChild(script);
    }

    return () => {
      mounted = false;
      delete window.onTelegramAuth;
    };
  }, []);

  const displayName = useMemo(() => {
    if (!user) return "";
    return [user.first_name, user.last_name].filter(Boolean).join(" ") || user.username || `id ${user.id}`;
  }, [user]);

  return (
    <div className="surface rounded-[32px] p-6 sm:p-8">
      <div className="kicker">Telegram auth</div>
      <h2 className="mt-3 text-2xl font-semibold">Войти через Telegram</h2>
      <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
        Авторизация нужна, чтобы связать сайт с вашим Telegram-аккаунтом и дальше открыть нужный сценарий в QazNashBot.
      </p>

      <div className="mt-6 rounded-[28px] border border-[var(--line)] bg-white/80 p-5">
        <div id="telegram-login-slot" />
        <p className="mt-4 text-xs leading-5 text-[var(--muted)]">
          Если виджет не загрузился, можно сразу открыть бота и продолжить там.
        </p>
      </div>

      <div className="mt-6 rounded-[28px] border border-[var(--line)] bg-[#1f2f2b] p-5 text-white">
        {status === "loading" && <p className="text-sm text-white/80">Проверяем подпись Telegram и создаём сессию...</p>}
        {status === "error" && <p className="text-sm text-[#ffc2b6]">Не получилось авторизовать Telegram: {error}</p>}
        {status === "ok" && user && (
          <div>
            <p className="text-sm uppercase tracking-[0.14em] text-white/55">Успешный вход</p>
            <h3 className="mt-2 text-2xl font-semibold">{displayName}</h3>
            <p className="mt-2 text-sm text-white/75">telegram_id: {user.id}</p>
            {user.username && <p className="text-sm text-white/75">username: @{user.username}</p>}
          </div>
        )}
        {status === "idle" && <p className="text-sm text-white/75">После входа тут появится подтверждение сессии и связка с Telegram.</p>}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <a href="/status" className="cta-secondary rounded-full px-5 py-3 text-sm font-semibold">Статус доступа</a>
        <a href={BOT_URL} className="cta-primary rounded-full px-5 py-3 text-sm font-semibold">Продолжить в боте</a>
        <a href={`${BOT_URL}?start=miniapp_demo`} className="cta-secondary rounded-full px-5 py-3 text-sm font-semibold">Открыть QazNashBot с demo-меткой</a>
      </div>
    </div>
  );
}
