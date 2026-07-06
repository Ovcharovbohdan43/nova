import { loadDatabaseEnv } from "./load-env";

// Railway/production injects DATABASE_URL; .env loading is for local dev only.
if (process.env.NODE_ENV !== "production") {
  loadDatabaseEnv();
}

import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export { PrismaClient };
export type { WaitlistEntry } from "@prisma/client";
