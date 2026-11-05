import { cookies } from "next/headers";
import { ADMIN_COOKIE, ADMIN_COOKIE_MAX_AGE, adminPasswordIsSet, newSessionValue, passwordMatches } from "../../../../lib/admin-auth";

export async function POST(request: Request) {
  if (!adminPasswordIsSet()) {
    return Response.json({ ok: false, error: "The admin password hasn’t been set up yet." }, { status: 503 });
  }
  const body = await request.json().catch(() => ({}));
  const password = typeof body.password === "string" ? body.password : "";
  if (!passwordMatches(password)) {
    await new Promise((resolve) => setTimeout(resolve, 600)); // slow down guessing
    return Response.json({ ok: false, error: "That password isn’t right." }, { status: 401 });
  }
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE, newSessionValue(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ADMIN_COOKIE_MAX_AGE,
  });
  return Response.json({ ok: true });
}
