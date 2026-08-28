/**
 * Outbound notification for new submissions.
 *
 * Deliberately provider-agnostic: it POSTs a JSON payload to whatever URL
 * is in ATELIER_NOTIFY_WEBHOOK. That covers Slack, Discord, Zapier, Make,
 * n8n, and most CRM intake endpoints without this file knowing which one
 * you chose. Pick a provider by setting the env var, not by editing code.
 *
 * Design rules, in order of importance:
 *
 * 1. A failed notification must NEVER fail the submission. The record is
 *    already persisted by the time we get here; losing the alert is bad,
 *    losing the buyer's request is worse. Every path returns a result
 *    object and throws nothing.
 * 2. No personal data beyond what the recipient needs to act. The payload
 *    carries the submitter's email (you have to be able to reply) but
 *    never free-text notes, which can contain anything.
 * 3. Unconfigured is a normal state, not an error. Local dev and any
 *    deploy that hasn't set the var yet log to stdout instead.
 */

export type NotifyOutcome =
  | { status: "sent" }
  | { status: "skipped"; reason: string }
  | { status: "failed"; reason: string };

const TIMEOUT_MS = 5_000;

export interface InquiryNotice {
  kind: "inquiry";
  id: string;
  email: string;
  specimen?: string;
  availableSpace: string;
}

export interface RegisterNotice {
  kind: "species-register";
  id: string;
  email: string;
  requested: string[];
  excluded: string[];
}

export type Notice = InquiryNotice | RegisterNotice;

/**
 * Human-readable one-liner. Slack and Discord both render a bare `text`
 * field, so this doubles as the message body for the common cases.
 */
function summarize(notice: Notice): string {
  if (notice.kind === "inquiry") {
    const subject = notice.specimen ?? "general enquiry";
    return `New custodianship inquest — ${subject} — from ${notice.email}`;
  }

  const total = notice.requested.length;
  const blocked = notice.excluded.length;
  const tail = blocked > 0 ? `, ${blocked} excluded by screening` : "";
  return `New species register — ${total} ${total === 1 ? "entry" : "entries"}${tail} — from ${notice.email}`;
}

export async function notify(notice: Notice): Promise<NotifyOutcome> {
  const webhook = process.env.ATELIER_NOTIFY_WEBHOOK;
  const summary = summarize(notice);

  if (!webhook) {
    // Not a failure: an unconfigured deploy still needs the operator to
    // see that something arrived.
    console.info(`[atelier:notify] ${summary} (no webhook configured)`);
    return { status: "skipped", reason: "ATELIER_NOTIFY_WEBHOOK not set" };
  }

  // `text` satisfies Slack and Discord directly; the structured fields
  // are there for Zapier/n8n/CRM consumers that want to branch on them.
  const payload = {
    text: summary,
    event: notice.kind,
    id: notice.id,
    email: notice.email,
    ...(notice.kind === "inquiry"
      ? { specimen: notice.specimen, availableSpace: notice.availableSpace }
      : { requested: notice.requested, excluded: notice.excluded }),
  };

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    if (!response.ok) {
      // Log the summary too, so an operator watching logs still learns a
      // submission arrived even when delivery is broken.
      console.error(
        `[atelier:notify] webhook returned ${response.status} — ${summary}`,
      );
      return { status: "failed", reason: `webhook returned ${response.status}` };
    }

    return { status: "sent" };
  } catch (err) {
    const reason =
      err instanceof Error && err.name === "AbortError"
        ? `webhook timed out after ${TIMEOUT_MS}ms`
        : err instanceof Error
          ? err.message
          : "unknown error";
    console.error(`[atelier:notify] ${reason} — ${summary}`);
    return { status: "failed", reason };
  } finally {
    clearTimeout(timer);
  }
}
