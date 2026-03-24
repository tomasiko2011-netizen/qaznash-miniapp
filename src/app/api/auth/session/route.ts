import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { parseSessionValue, SESSION_COOKIE } from "@/lib/telegram-auth";

export async function GET() {
  const cookieStore = await cookies();
  const session = parseSessionValue(cookieStore.get(SESSION_COOKIE)?.value);
  return NextResponse.json({ ok: true, user: session });
}
