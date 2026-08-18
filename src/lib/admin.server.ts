const encoder = new TextEncoder();

function base64url(bytes: Uint8Array): string {
  let str = "";
  for (const b of bytes) str += String.fromCharCode(b);
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function hmac(payload: string): Promise<string> {
  const secret = process.env["ADMIN_SESSION_SECRET"];
  if (!secret) throw new Error("إعدادات الإدارة غير مكتملة");
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  return base64url(new Uint8Array(sig));
}

const SESSION_MS = 1000 * 60 * 60 * 8;

export async function verifyAdminPassword(password: string): Promise<boolean> {
  const expected = process.env["ADMIN_PASSWORD"];
  if (!expected) throw new Error("إعدادات الإدارة غير مكتملة");
  if (password.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) {
    diff |= password.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return diff === 0;
}

export async function issueAdminToken(): Promise<string> {
  const payload = String(Date.now() + SESSION_MS);
  return `${payload}.${await hmac(payload)}`;
}

export async function requireAdmin(token: string | undefined | null): Promise<void> {
  const parts = (token ?? "").split(".");
  if (parts.length !== 2) throw new Error("غير مصرح");
  const [payload, sig] = parts;
  const expected = await hmac(payload!);
  if (sig !== expected) throw new Error("غير مصرح");
  if (Number(payload) < Date.now()) throw new Error("انتهت الجلسة، يرجى تسجيل الدخول من جديد");
}
