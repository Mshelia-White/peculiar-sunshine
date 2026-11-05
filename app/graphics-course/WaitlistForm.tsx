"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

type Edition = "phone" | "laptop" | "either";
type Status = "idle" | "sending" | "created" | "exists" | "error";

const EDITIONS: { value: Edition; label: string }[] = [
  { value: "phone", label: "Phone" },
  { value: "laptop", label: "Laptop" },
  { value: "either", label: "Not sure yet" },
];

export const JOINED_KEY = "ps-course-waitlist";

export default function WaitlistForm({
  open,
  live,
  launchLabel,
  onClose,
  onJoined,
}: {
  open: boolean;
  live: boolean;
  launchLabel: string;
  onClose: () => void;
  onJoined: (name: string) => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [edition, setEdition] = useState<Edition | null>(null);
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const firstField = useRef<HTMLInputElement>(null);
  const lastFocus = useRef<Element | null>(null);

  useEffect(() => {
    if (!open) return;
    lastFocus.current = document.activeElement;
    document.body.style.overflow = "hidden";
    const timer = window.setTimeout(() => firstField.current?.focus(), 250);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      (lastFocus.current as HTMLElement | null)?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  const done = status === "created" || status === "exists";
  const clearError = (key: string) =>
    setErrors((current) => {
      if (!current[key]) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
  const firstName = name.trim().split(" ")[0];

  async function submit(event: FormEvent) {
    event.preventDefault();
    const next: Record<string, string> = {};
    if (name.trim().length < 2) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) next.email = "Please enter a valid email address.";
    if (!/^\+?[0-9\s()-]{7,20}$/.test(phone.trim())) next.phone = "Please enter a valid phone number.";
    if (!edition) next.edition = "Please choose one.";
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus("sending");
    setMessage("");
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, edition, company, intent: live ? "enrol" : "waitlist" }),
      });
      const data = await response.json().catch(() => ({}));
      if (response.ok && data.ok) {
        setStatus(data.status === "exists" ? "exists" : "created");
        try {
          window.localStorage.setItem(JOINED_KEY, name.trim());
        } catch {}
        onJoined(name.trim());
        return;
      }
      if (data.errors) setErrors(data.errors);
      setMessage(data.error ?? "Please check the highlighted fields.");
      setStatus("error");
    } catch {
      setMessage("You seem to be offline. Please check your connection and try again.");
      setStatus("error");
    }
  }

  return (
    <div className="gc-modal" role="dialog" aria-modal="true" aria-labelledby="gc-form-title" onMouseDown={onClose}>
      <div className="gc-modal-panel" onMouseDown={(event) => event.stopPropagation()}>
        <button type="button" className="gc-modal-close" aria-label="Close" onClick={onClose}>
          <i aria-hidden="true" />
        </button>

        {done ? (
          <div className="gc-success">
            <svg className="gc-success-mark" viewBox="0 0 64 64" aria-hidden="true">
              <circle cx="32" cy="32" r="29" />
              <path d="M20 33.5 28.5 42 45 24" />
            </svg>
            <p className="gc-eyebrow">{status === "exists" ? "Already registered" : live ? "Seat reserved" : "You’re on the list"}</p>
            <h2 className="gc-modal-title">
              {status === "exists" ? <>You’re already <em>on the list.</em></> : <>Welcome in, <em>{firstName}.</em></>}
            </h2>
            <p className="gc-modal-sub">
              {live
                ? <>Peculiar will email <strong>{email.trim()}</strong> with payment and access details shortly.</>
                : <>We’ll email <strong>{email.trim()}</strong> with the launch price and your access before enrolment opens on {launchLabel}.</>}
            </p>
            <button type="button" className="gc-btn gc-btn-primary gc-btn-block" onClick={onClose}>
              <span>Back to the page</span>
            </button>
          </div>
        ) : (
          <form className="gc-form" onSubmit={submit} noValidate>
            <p className="gc-eyebrow">{live ? "Enrolment is open" : "Pre-launch waitlist"}</p>
            <h2 className="gc-modal-title" id="gc-form-title">
              {live ? <>Reserve <em>your seat.</em></> : <>Be first through <em>the door.</em></>}
            </h2>
            <p className="gc-modal-sub">
              {live
                ? "Leave your details and Peculiar will send your payment and access details."
                : "Join the waitlist and you’ll hear the launch price—and get access—before anyone else."}
            </p>

            <label className={errors.name ? "gc-field has-error" : "gc-field"}>
              <span>Full name</span>
              <input
                ref={firstField}
                type="text"
                name="name"
                autoComplete="name"
                placeholder="e.g. Ada Okafor"
                value={name}
                onChange={(event) => { setName(event.target.value); clearError("name"); }}
                aria-invalid={Boolean(errors.name)}
              />
              {errors.name && <em className="gc-field-error">{errors.name}</em>}
            </label>

            <label className={errors.email ? "gc-field has-error" : "gc-field"}>
              <span>Email address</span>
              <input
                type="email"
                name="email"
                autoComplete="email"
                inputMode="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => { setEmail(event.target.value); clearError("email"); }}
                aria-invalid={Boolean(errors.email)}
              />
              {errors.email && <em className="gc-field-error">{errors.email}</em>}
            </label>

            <label className={errors.phone ? "gc-field has-error" : "gc-field"}>
              <span>Phone number</span>
              <input
                type="tel"
                name="phone"
                autoComplete="tel"
                inputMode="tel"
                placeholder="0801 234 5678"
                value={phone}
                onChange={(event) => { setPhone(event.target.value); clearError("phone"); }}
                aria-invalid={Boolean(errors.phone)}
              />
              {errors.phone && <em className="gc-field-error">{errors.phone}</em>}
            </label>

            <fieldset className={errors.edition ? "gc-field has-error" : "gc-field"}>
              <legend>I’ll learn on my…</legend>
              <div className="gc-options">
                {EDITIONS.map((option) => (
                  <button
                    type="button"
                    key={option.value}
                    className={edition === option.value ? "is-on" : ""}
                    aria-pressed={edition === option.value}
                    onClick={() => { setEdition(option.value); clearError("edition"); }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              {errors.edition && <em className="gc-field-error">{errors.edition}</em>}
            </fieldset>

            {/* Hidden from people; catches bots. */}
            <input
              className="gc-trap"
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              value={company}
              onChange={(event) => setCompany(event.target.value)}
              aria-hidden="true"
            />

            {message && status === "error" && <p className="gc-form-error" role="alert">{message}</p>}

            <button type="submit" className="gc-btn gc-btn-primary gc-btn-block" disabled={status === "sending"}>
              {status === "sending" ? <span className="gc-spinner" aria-hidden="true" /> : null}
              <span>{status === "sending" ? "Saving your place…" : live ? "Reserve my seat" : "Join the waitlist"}</span>
              {status !== "sending" && <b aria-hidden="true">→</b>}
            </button>
            <p className="gc-form-note">Your details are only used to contact you about this course.</p>
          </form>
        )}
      </div>
    </div>
  );
}
