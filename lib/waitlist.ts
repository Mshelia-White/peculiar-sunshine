import { neon } from "@neondatabase/serverless";
import { promises as fs } from "node:fs";
import path from "node:path";

export type WaitlistEntry = {
  name: string;
  email: string;
  phone: string;
  edition: "phone" | "laptop" | "either";
  intent: "waitlist" | "enrol";
};

export type SaveResult = "created" | "exists";

export type StoredEntry = WaitlistEntry & { id: number; created_at: string };

export class StorageNotConfiguredError extends Error {}

// Vercel's Neon integration provides DATABASE_URL (POSTGRES_URL as a fallback).
const databaseUrl = process.env.DATABASE_URL ?? process.env.POSTGRES_URL;

let tableReady: Promise<unknown> | null = null;

function ensureTable(url: string) {
  const sql = neon(url);
  tableReady ??= sql`
    CREATE TABLE IF NOT EXISTS course_waitlist (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      phone TEXT NOT NULL,
      edition TEXT NOT NULL,
      intent TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `.catch((error) => {
    tableReady = null; // try again on the next request
    throw error;
  });
  return { sql, ready: tableReady };
}

async function saveToDatabase(url: string, entry: WaitlistEntry): Promise<SaveResult> {
  const { sql, ready } = ensureTable(url);
  await ready;
  const rows = await sql`
    INSERT INTO course_waitlist (name, email, phone, edition, intent)
    VALUES (${entry.name}, ${entry.email}, ${entry.phone}, ${entry.edition}, ${entry.intent})
    ON CONFLICT (email) DO NOTHING
    RETURNING id
  `;
  return rows.length > 0 ? "created" : "exists";
}

async function readLocalFile(): Promise<StoredEntry[]> {
  try {
    const list = JSON.parse(await fs.readFile(path.join(process.cwd(), ".data", "waitlist.json"), "utf8"));
    return (list as (WaitlistEntry & { created_at: string })[]).map((item, index) => ({ ...item, id: index + 1 }));
  } catch {
    return [];
  }
}

export async function listWaitlistEntries(): Promise<StoredEntry[]> {
  if (databaseUrl) {
    const { sql, ready } = ensureTable(databaseUrl);
    await ready;
    const rows = await sql`
      SELECT id, name, email, phone, edition, intent, created_at
      FROM course_waitlist
      ORDER BY created_at DESC
    `;
    return rows.map((row) => ({ ...(row as StoredEntry), created_at: new Date(row.created_at as string).toISOString() }));
  }
  if (process.env.NODE_ENV !== "production") return (await readLocalFile()).reverse();
  throw new StorageNotConfiguredError("No database is connected yet.");
}

// Local development only: keeps signups in .data/waitlist.json until a database is connected.
async function saveToLocalFile(entry: WaitlistEntry): Promise<SaveResult> {
  const dir = path.join(process.cwd(), ".data");
  const file = path.join(dir, "waitlist.json");
  await fs.mkdir(dir, { recursive: true });
  let list: (WaitlistEntry & { created_at: string })[] = [];
  try {
    list = JSON.parse(await fs.readFile(file, "utf8"));
  } catch {
    list = [];
  }
  if (list.some((item) => item.email === entry.email)) return "exists";
  list.push({ ...entry, created_at: new Date().toISOString() });
  await fs.writeFile(file, JSON.stringify(list, null, 2));
  return "created";
}

export async function saveWaitlistEntry(entry: WaitlistEntry): Promise<SaveResult> {
  if (databaseUrl) return saveToDatabase(databaseUrl, entry);
  if (process.env.NODE_ENV !== "production") return saveToLocalFile(entry);
  throw new StorageNotConfiguredError("No database is connected yet.");
}
