import type { Metadata } from "next";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, adminPasswordIsSet, sessionIsValid } from "../../lib/admin-auth";
import { listWaitlistEntries, type StoredEntry } from "../../lib/waitlist";
import { CopyEmails, LoginForm, LogoutButton } from "./AdminClient";
import "./admin.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Waitlist admin — Peculiar Sunshine",
  robots: { index: false, follow: false },
};

const EDITION_LABEL: Record<string, string> = { phone: "Phone", laptop: "Laptop", either: "Not sure" };
const when = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", hour: "numeric", minute: "2-digit", hour12: true, timeZone: "Africa/Lagos" });

export default async function AdminPage() {
  const cookieStore = await cookies();
  const signedIn = sessionIsValid(cookieStore.get(ADMIN_COOKIE)?.value);

  if (!signedIn) {
    return (
      <main className="ad ad-center">
        <LoginForm ready={adminPasswordIsSet()} />
      </main>
    );
  }

  let entries: StoredEntry[] = [];
  let loadError = "";
  try {
    entries = await listWaitlistEntries();
  } catch (error) {
    console.error("admin: could not load waitlist", error);
    loadError = "Couldn’t load the waitlist right now. Please refresh in a moment.";
  }

  const dayAgo = Date.now() - 24 * 60 * 60 * 1000;
  const stats = [
    { label: "Total sign-ups", value: entries.length },
    { label: "Last 24 hours", value: entries.filter((e) => new Date(e.created_at).getTime() > dayAgo).length },
    { label: "Phone", value: entries.filter((e) => e.edition === "phone").length },
    { label: "Laptop", value: entries.filter((e) => e.edition === "laptop").length },
    { label: "Not sure", value: entries.filter((e) => e.edition === "either").length },
  ];

  return (
    <main className="ad">
      <header className="ad-top">
        <div>
          <p className="ad-eyebrow">Learn to Create Flyers &amp; Carousels Using AI</p>
          <h1>Course waitlist</h1>
        </div>
        <div className="ad-actions">
          <a className="ad-btn ad-btn-dark" href="/api/admin/export">Download CSV</a>
          <CopyEmails emails={entries.map((e) => e.email)} />
          <LogoutButton />
        </div>
      </header>

      <section className="ad-stats">
        {stats.map((stat) => (
          <div key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </section>

      {loadError && <p className="ad-error">{loadError}</p>}

      {entries.length === 0 && !loadError ? (
        <div className="ad-empty">
          <p>No sign-ups yet.</p>
          <span>New sign-ups from peculiarsunshine.online/graphics-course will appear here.</span>
        </div>
      ) : (
        <div className="ad-table-wrap">
          <table className="ad-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Learns on</th>
                <th>Joined</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, index) => (
                <tr key={entry.id}>
                  <td className="ad-num">{entries.length - index}</td>
                  <td className="ad-name">{entry.name}</td>
                  <td><a href={`mailto:${entry.email}`}>{entry.email}</a></td>
                  <td><a href={`tel:${entry.phone.replace(/[^+\d]/g, "")}`}>{entry.phone}</a></td>
                  <td><span className={`ad-pill ${entry.edition}`}>{EDITION_LABEL[entry.edition] ?? entry.edition}</span></td>
                  <td className="ad-when">{when.format(new Date(entry.created_at))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
