import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  createSessionValue,
  MAX_AGE_SECONDS,
  SESSION_COOKIE,
  TelegramLoginPayload,
  verifyTelegramAuth,
} from "@/lib/telegram-auth";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as TelegramLoginPayload;
    if (!body?.id || !body?.hash || !body?.auth_date) {
      return NextResponse.json({ ok: false, error: "invalid_payload" }, { status: 400 });
    }

    const authAge = Math.abs(Date.now() / 1000 - Number(body.auth_date));
    if (authAge > 3600) {
      return NextResponse.json({ ok: false, error: "stale_auth" }, { status: 400 });
    }

    if (!verifyTelegramAuth(body)) {
      return NextResponse.json({ ok: false, error: "invalid_signature" }, { status: 401 });
    }

    const sessionData = {
      id: Number(body.id),
      first_name: body.first_name ?? "",
      last_name: body.last_name ?? "",
      username: body.username ?? "",
      photo_url: body.photo_url ?? "",
      auth_date: Number(body.auth_date),
    };

    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE, createSessionValue(sessionData), {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: MAX_AGE_SECONDS,
    });

    return NextResponse.json({ ok: true, user: sessionData });
  } catch (error) {
    return NextResponse.json({ ok: false, error: error instanceof Error ? error.message : "unknown_error" }, { status: 500 });
  }
}
