"use client";

import { useState, type FormEvent } from "react";

export function LoginForm({ ready }: { ready: boolean }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    }).catch(() => null);
    const data = response ? await response.json().catch(() => ({})) : {};
    if (response?.ok && data.ok) {
      window.location.reload();
      return;
    }
    setError(data.error ?? "Couldn’t sign in. Please try again.");
    setBusy(false);
  }

  return (
    <form className="ad-login" onSubmit={submit}>
      <span className="ad-mark">PS</span>
      <p className="ad-eyebrow">Private</p>
      <h1>Course waitlist</h1>
      {ready ? (
        <>
          <p className="ad-muted">Enter the admin password to see who has signed up.</p>
          <label>
            <span>Password</span>
            <input type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} autoFocus />
          </label>
          {error && <p className="ad-error" role="alert">{error}</p>}
          <button type="submit" className="ad-btn ad-btn-dark" disabled={busy || !password}>
            {busy ? "Checking…" : "Sign in"}
          </button>
        </>
      ) : (
        <p className="ad-muted">
          The admin password hasn’t been set up yet. In Vercel, open the project’s <strong>Settings → Environment Variables</strong>, add <code>ADMIN_PASSWORD</code> (at least 8 characters), then redeploy.
        </p>
      )}
    </form>
  );
}

export function CopyEmails({ emails }: { emails: string[] }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      className="ad-btn"
      disabled={!emails.length}
      onClick={async () => {
        await navigator.clipboard.writeText(emails.join(", "));
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2000);
      }}
    >
      {copied ? "Copied ✓" : `Copy ${emails.length} email${emails.length === 1 ? "" : "s"}`}
    </button>
  );
}

export function LogoutButton() {
  return (
    <button
      type="button"
      className="ad-btn ad-btn-ghost"
      onClick={async () => {
        await fetch("/api/admin/logout", { method: "POST" }).catch(() => null);
        window.location.reload();
      }}
    >
      Log out
    </button>
  );
}
