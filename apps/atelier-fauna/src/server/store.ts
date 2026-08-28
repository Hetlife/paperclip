import { promises as fs } from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";

/**
 * A deliberately small JSON-file store. Atelier Fauna has no database
 * provisioned, and a real one is premature before the site takes its
 * first genuine inquiry. Everything here is written so swapping in
 * Postgres later means replacing this file only — routes never touch
 * the filesystem directly.
 *
 * Not suitable for concurrent multi-instance deploys (last write wins).
 * See docs/BACKEND.md "Before this handles real traffic".
 */

const DATA_DIR = process.env.ATELIER_DATA_DIR
  ? path.resolve(process.env.ATELIER_DATA_DIR)
  : path.join(process.cwd(), ".data");

async function ensureDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

function fileFor(collection: string) {
  // Guard against path traversal via a collection name.
  if (!/^[a-z-]+$/.test(collection)) {
    throw new Error(`Invalid collection name: ${collection}`);
  }
  return path.join(DATA_DIR, `${collection}.json`);
}

export async function readAll<T>(collection: string): Promise<T[]> {
  await ensureDir();
  try {
    const raw = await fs.readFile(fileFor(collection), "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw err;
  }
}

export async function insert<T extends object>(
  collection: string,
  record: T,
): Promise<T & { id: string; createdAt: string }> {
  await ensureDir();
  const existing = await readAll<T & { id: string; createdAt: string }>(
    collection,
  );
  const saved = {
    ...record,
    id: randomUUID(),
    createdAt: new Date().toISOString(),
  };
  existing.push(saved);

  // Write to a temp file then rename, so a crash mid-write can't leave
  // a truncated JSON file behind and lose every prior record.
  const target = fileFor(collection);
  const tmp = `${target}.${randomUUID()}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(existing, null, 2), "utf8");
  await fs.rename(tmp, target);

  return saved;
}
