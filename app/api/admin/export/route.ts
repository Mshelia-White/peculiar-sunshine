import { cookies } from "next/headers";
import { ADMIN_COOKIE, sessionIsValid } from "../../../../lib/admin-auth";
import { listWaitlistEntries } from "../../../../lib/waitlist";

const EDITION_LABEL: Record<string, string> = { phone: "Phone", laptop: "Laptop", either: "Not sure" };

function csvCell(value: string) {
  // Quote every cell and neutralise spreadsheet formulas.
  const safe = /^[=+\-@]/.test(value) ? `'${value}` : value;
  return `"${safe.replace(/"/g, '""')}"`;
}

export async function GET() {
  const cookieStore = await cookies();
  if (!sessionIsValid(cookieStore.get(ADMIN_COOKIE)?.value)) {
    return new Response("Not signed in", { status: 401 });
  }
  const entries = await listWaitlistEntries();
  const header = ["Name", "Email", "Phone", "Learns on", "Type", "Joined (Lagos time)"];
  const format = new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeStyle: "short", timeZone: "Africa/Lagos" });
  const lines = [
    header.map(csvCell).join(","),
    ...entries.map((entry) =>
      [
        csvCell(entry.name),
        csvCell(entry.email),
        // Phone numbers are validated to digits, spaces, +, ( ) and -; this keeps leading 0s and + in spreadsheets.
        `"=""${entry.phone}"""`,
        csvCell(EDITION_LABEL[entry.edition] ?? entry.edition),
        csvCell(entry.intent === "enrol" ? "Enrol" : "Waitlist"),
        csvCell(format.format(new Date(entry.created_at))),
      ].join(","),
    ),
  ];
  const date = new Date().toISOString().slice(0, 10);
  return new Response("﻿" + lines.join("\r\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="course-waitlist-${date}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
