import { existsSync } from "node:fs";
import { resolve } from "node:path";

import { config } from "dotenv";

/**
 * System DATABASE_URL (e.g. Docker `build@localhost`) must not override project env.
 * Next.js loads .env.local but shell vars win — we re-load project files with override.
 */
export function loadDatabaseEnv(): void {
  const cwd = process.cwd();
  const candidates = [
    resolve(__dirname, "../../../.env"),
    resolve(cwd, "../../.env"),
    resolve(cwd, "../.env"),
    resolve(cwd, ".env"),
    resolve(__dirname, "../../../apps/web/.env.local"),
    resolve(cwd, ".env.local"),
  ];

  const seen = new Set<string>();

  for (const path of candidates) {
    if (seen.has(path) || !existsSync(path)) continue;
    seen.add(path);
    config({ path, override: true });
  }
}
