import { saveWaitlistEntry, StorageNotConfiguredError, type WaitlistEntry } from "../../../lib/waitlist";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^\+?[0-9\s()-]{7,20}$/;
const EDITIONS = new Set(["phone", "laptop", "either"]);

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().replace(/\s+/g, " ").slice(0, max) : "";
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Please try again." }, { status: 400 });
  }

  // Hidden field that people never see; bots tend to fill it in.
  if (clean(body.company, 200)) return Response.json({ ok: true, status: "created" });

  const name = clean(body.name, 80);
  const email = clean(body.email, 160).toLowerCase();
  const phone = clean(body.phone, 24);
  const edition = clean(body.edition, 10);
  const intent = body.intent === "enrol" ? "enrol" : "waitlist";

  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = "Please enter your name.";
  if (!EMAIL.test(email)) errors.email = "Please enter a valid email address.";
  if (!PHONE.test(phone)) errors.phone = "Please enter a valid phone number.";
  if (!EDITIONS.has(edition)) errors.edition = "Please choose an edition.";
  if (Object.keys(errors).length) return Response.json({ ok: false, errors }, { status: 422 });

  const entry: WaitlistEntry = {
    name,
    email,
    phone,
    edition: edition as WaitlistEntry["edition"],
    intent,
  };

  try {
    const status = await saveWaitlistEntry(entry);
    return Response.json({ ok: true, status });
  } catch (error) {
    if (error instanceof StorageNotConfiguredError) {
      return Response.json({ ok: false, error: "Sign-ups open shortly. Please try again soon." }, { status: 503 });
    }
    console.error("waitlist signup failed", error);
    return Response.json({ ok: false, error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
