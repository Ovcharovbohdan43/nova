"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  waitlistSchema,
  type WaitlistInput,
} from "@/lib/validations/waitlist";
import { cn } from "@/lib/utils";

type WaitlistFormProps = {
  intent?: WaitlistInput["intent"];
  source?: string;
  className?: string;
  compact?: boolean;
};

type SubmitState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; message: string; position?: number }
  | { status: "error"; message: string };

export function WaitlistForm({
  intent,
  source,
  className,
  compact = false,
}: WaitlistFormProps) {
  const [submitState, setSubmitState] = useState<SubmitState>({
    status: "idle",
  });

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<WaitlistInput>({
    defaultValues: { intent, source, email: "", website: "" },
  });

  async function onSubmit(data: WaitlistInput) {
    const parsed = waitlistSchema.safeParse(data);

    if (!parsed.success) {
      const emailError = parsed.error.flatten().fieldErrors.email?.[0];
      if (emailError) {
        setError("email", { message: emailError });
      }
      return;
    }

    if (parsed.data.website) return;

    setSubmitState({ status: "loading" });

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      const json = (await res.json()) as {
        ok?: boolean;
        message?: string;
        position?: number;
        error?: string;
      };

      if (!res.ok) {
        setSubmitState({
          status: "error",
          message: json.error ?? "Something went wrong. Try again.",
        });
        return;
      }

      setSubmitState({
        status: "success",
        message: json.message ?? "You're on the list!",
        position: json.position,
      });
      reset({ intent, source, email: "", website: "" });
    } catch {
      setSubmitState({
        status: "error",
        message: "Network error. Check your connection.",
      });
    }
  }

  if (submitState.status === "success") {
    return (
      <div
        className={cn(
          "flex items-start gap-3 rounded-xl border border-primary/30 bg-primary/5 p-4",
          className,
        )}
      >
        <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />
        <div>
          <p className="font-medium text-foreground">{submitState.message}</p>
          {submitState.position != null && (
            <p className="mt-1 text-sm text-muted-foreground">
              You&apos;re #{submitState.position} on the waitlist. We&apos;ll
              email you when beta opens.
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("space-y-3", className)}
      noValidate
    >
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
        {...register("website")}
      />
      <input type="hidden" {...register("intent")} />
      <input type="hidden" {...register("source")} />

      <div
        className={cn(
          "flex gap-2",
          compact ? "flex-col sm:flex-row" : "flex-col sm:flex-row",
        )}
      >
        <div className="flex-1 space-y-1.5">
          <Label htmlFor="waitlist-email" className="sr-only">
            Email address
          </Label>
          <Input
            id="waitlist-email"
            type="email"
            placeholder="you@indie.dev"
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className="h-11 border-border/60 bg-background/80 backdrop-blur-sm"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p id="email-error" className="text-sm text-destructive">
              {errors.email.message}
            </p>
          )}
        </div>
        <Button
          type="submit"
          size="lg"
          disabled={submitState.status === "loading"}
          className="h-11 shrink-0 gap-2"
        >
          {submitState.status === "loading" ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <>
              Join waitlist
              <ArrowRight className="size-4" />
            </>
          )}
        </Button>
      </div>

      {submitState.status === "error" && (
        <p className="text-sm text-destructive">{submitState.message}</p>
      )}

      <p className="text-xs text-muted-foreground">
        No spam. Unsubscribe anytime. Early access for founding members.
      </p>
    </form>
  );
}
