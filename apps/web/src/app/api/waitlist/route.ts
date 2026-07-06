import { NextResponse } from "next/server";
import { prisma } from "@nova/database";

import {
  waitlistSchema,
  type WaitlistInput,
} from "@/lib/validations/waitlist";
import { toWaitlistDisplayPosition } from "@/lib/waitlist";

const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60_000;

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? "unknown";
  return request.headers.get("x-real-ip") ?? "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT) return true;

  entry.count += 1;
  return false;
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Try again in a minute." },
        { status: 429 },
      );
    }

    const body = (await request.json()) as WaitlistInput;
    const parsed = waitlistSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten().fieldErrors.email?.[0] ?? "Invalid input" },
        { status: 400 },
      );
    }

    const { email, intent, source } = parsed.data;

    if (parsed.data.website) {
      return NextResponse.json({ ok: true, message: "You're on the list!" });
    }

    const normalizedEmail = email.toLowerCase();

    const existing = await prisma.waitlistEntry.findUnique({
      where: { email: normalizedEmail },
    });

    if (existing) {
      const signupOrder = await prisma.waitlistEntry.count({
        where: { createdAt: { lte: existing.createdAt } },
      });

      return NextResponse.json({
        ok: true,
        message: "You're already on the list!",
        position: toWaitlistDisplayPosition(signupOrder),
      });
    }

    const entry = await prisma.waitlistEntry.create({
      data: {
        email: normalizedEmail,
        intent: intent ?? null,
        source: source ?? null,
      },
    });

    const signupOrder = await prisma.waitlistEntry.count({
      where: { createdAt: { lte: entry.createdAt } },
    });

    return NextResponse.json(
      {
        ok: true,
        message: "You're on the list!",
        position: toWaitlistDisplayPosition(signupOrder),
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("waitlist_error", error);
    return NextResponse.json(
      { error: "Unable to join waitlist. Please try again later." },
      { status: 500 },
    );
  }
}
