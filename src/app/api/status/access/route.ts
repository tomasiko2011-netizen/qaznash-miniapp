import crypto from "crypto";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { parseSessionValue, SESSION_COOKIE } from "@/lib/telegram-auth";

function sign(telegramId: number, ts: number, secret: string) {
  return crypto.createHmac("sha256", secret).update(`${telegramId}:${ts}`).digest("hex");
}

export async function GET() {
  const baseUrl = process.env.STATUS_API_BASE_URL;
  const secret = process.env.STATUS_API_SECRET;
  if (!baseUrl || !secret) {
    return NextResponse.json({ ok: false, error: "status_api_not_configured" }, { status: 500 });
  }

  const cookieStore = await cookies();
  const session = parseSessionValue(cookieStore.get(SESSION_COOKIE)?.value);
  if (!session?.id) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const ts = Math.floor(Date.now() / 1000);
  const sig = sign(session.id, ts, secret);
  const url = new URL("/v1/access-status", baseUrl);
  url.searchParams.set("telegram_id", String(session.id));
  url.searchParams.set("ts", String(ts));
  url.searchParams.set("sig", sig);

  const response = await fetch(url.toString(), {
    method: "GET",
    cache: "no-store",
    headers: { Accept: "application/json" },
  });
  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}
