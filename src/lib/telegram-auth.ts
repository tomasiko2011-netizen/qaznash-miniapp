import crypto from "crypto";

const SESSION_COOKIE = "qaznash_session";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

export type TelegramLoginPayload = {
  id: number;
  first_name?: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date: number;
  hash: string;
};

export function getBotUsername() {
  return process.env.NEXT_PUBLIC_TELEGRAM_BOT_NAME ?? "QazNashBot";
}

function getBotToken() {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) {
    throw new Error("TELEGRAM_BOT_TOKEN is not set");
  }
  return token;
}

export function verifyTelegramAuth(data: TelegramLoginPayload) {
  const { hash, ...rest } = data;
  const checkString = Object.entries(rest)
    .filter(([, value]) => value !== undefined && value !== null && value !== "")
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join("\n");

  const secret = crypto.createHash("sha256").update(getBotToken()).digest();
  const computedHash = crypto.createHmac("sha256", secret).update(checkString).digest("hex");
  return crypto.timingSafeEqual(Buffer.from(computedHash), Buffer.from(hash));
}

export function createSessionValue(data: Omit<TelegramLoginPayload, "hash">) {
  const payload = Buffer.from(JSON.stringify(data)).toString("base64url");
  const signature = crypto.createHmac("sha256", getBotToken()).update(payload).digest("base64url");
  return `${payload}.${signature}`;
}

export function parseSessionValue(raw: string | undefined) {
  if (!raw) return null;
  const [payload, signature] = raw.split(".");
  if (!payload || !signature) return null;
  const expected = crypto.createHmac("sha256", getBotToken()).update(payload).digest("base64url");
  if (!crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature))) return null;
  try {
    const parsed = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    return parsed as Omit<TelegramLoginPayload, "hash">;
  } catch {
    return null;
  }
}

export { MAX_AGE_SECONDS, SESSION_COOKIE };
