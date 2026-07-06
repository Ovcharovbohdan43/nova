import { PrismaClient } from "@prisma/client";

import { loadDatabaseEnv } from "./load-env";

// Railway/production injects DATABASE_URL; .env loading is for local dev only.
if (process.env.NODE_ENV !== "production") {
  loadDatabaseEnv();
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient(): PrismaClient {
  return new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });
}

function getPrismaClient(): PrismaClient {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = createPrismaClient();
  }
  return globalForPrisma.prisma;
}

/** Lazy proxy — avoids crashing module load when env is misconfigured. */
export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop, receiver) {
    const client = getPrismaClient();
    const value = Reflect.get(client, prop, receiver);
    return typeof value === "function" ? value.bind(client) : value;
  },
});

export { PrismaClient };
export type { WaitlistEntry } from "@prisma/client";
