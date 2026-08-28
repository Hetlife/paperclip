"use client";

import { useRef, useState, type KeyboardEvent, type ClipboardEvent } from "react";
import { X } from "lucide-react";

const MAX_ENTRIES = 50;
const MAX_LENGTH = 200;

/**
 * Free-text species entry as removable chips. Buyers arrive with a list —
 * typed one at a time, or pasted from a note — so this commits an entry on
 * Enter, comma, or blur, and splits a pasted block on newlines and commas
 * rather than making someone re-type it line by line.
 *
 * Limits mirror the server's (`validateSpeciesIntake`): 50 entries, 200
 * chars each. Enforced here for feedback, not for safety — the API
 * validates independently.
 */
export function SpeciesChipInput({
  value,
  onChange,
  disabled,
}: {
  value: string[];
  onChange: (next: string[]) => void;
  disabled?: boolean;
}) {
  const [draft, setDraft] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const atLimit = value.length >= MAX_ENTRIES;

  function commit(raw: string) {
    const entries = raw
      .split(/[\n,]+/)
      .map((s) => s.trim().slice(0, MAX_LENGTH))
      .filter(Boolean);

    if (entries.length === 0) return;

    // Case-insensitive dedupe against what's already there.
    const seen = new Set(value.map((v) => v.toLowerCase()));
    const additions = entries.filter((e) => {
      const key = e.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    if (additions.length > 0) {
      onChange([...value, ...additions].slice(0, MAX_ENTRIES));
    }
    setDraft("");
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      commit(draft);
      return;
    }
    // Backspace on an empty field removes the last chip — standard
    // token-input behaviour people expect.
    if (e.key === "Backspace" && draft === "" && value.length > 0) {
      onChange(value.slice(0, -1));
    }
  }

  function handlePaste(e: ClipboardEvent<HTMLInputElement>) {
    const text = e.clipboardData.getData("text");
    if (/[\n,]/.test(text)) {
      e.preventDefault();
      commit(text);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <div
        onClick={() => inputRef.current?.focus()}
        className="flex min-h-[3rem] flex-wrap items-center gap-2 rounded-xl border border-black/[0.08] p-2 focus-within:border-neutral-400"
      >
        {value.map((species) => (
          <span
            key={species}
            className="inline-flex items-center gap-1.5 rounded-lg bg-neutral-100 py-1 pl-2.5 pr-1.5 text-sm text-neutral-800"
          >
            {species}
            <button
              type="button"
              onClick={() => onChange(value.filter((v) => v !== species))}
              disabled={disabled}
              aria-label={`Remove ${species}`}
              className="rounded p-0.5 text-neutral-400 hover:text-neutral-700"
            >
              <X size={13} strokeWidth={1.75} />
            </button>
          </span>
        ))}

        <input
          ref={inputRef}
          value={draft}
          disabled={disabled || atLimit}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          onBlur={() => commit(draft)}
          maxLength={MAX_LENGTH}
          placeholder={
            atLimit
              ? `Limit of ${MAX_ENTRIES} reached`
              : value.length === 0
                ? "e.g. Neon Tetra, Corydoras aeneus…"
                : "Add another…"
          }
          aria-label="Species name"
          className="min-w-[12rem] flex-1 bg-transparent px-1 py-1 text-sm outline-none placeholder:text-neutral-400"
        />
      </div>

      <p className="text-xs text-neutral-500">
        Press Enter or comma after each. Pasting a list splits it
        automatically. {value.length}/{MAX_ENTRIES} entries.
      </p>
    </div>
  );
}
