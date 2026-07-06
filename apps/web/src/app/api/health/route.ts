import { NextResponse } from "next/server";
import { prisma } from "@nova/database";

export const dynamic = "force-dynamic";

export async function GET() {
  const checks: Record<string, "ok" | "error"> = {
    api: "ok",
    database: "error",
  };

  try {
    await prisma.$queryRaw`SELECT 1`;
    checks.database = "ok";
  } catch {
    checks.database = "error";
  }

  const healthy = checks.database === "ok";

  return NextResponse.json(
    {
      status: healthy ? "healthy" : "degraded",
      service: "nova-ai-studio",
      checks,
      timestamp: new Date().toISOString(),
    },
    // Liveness: app is up even if DB is down (Railway healthcheck)
    { status: 200 },
  );
}
