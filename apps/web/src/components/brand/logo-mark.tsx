import { cn } from "@/lib/utils";

const sizeClasses = {
  sm: "size-6 text-[11px]",
  md: "size-7 text-xs",
  lg: "size-8 text-sm",
} as const;

type LogoMarkProps = {
  className?: string;
  size?: keyof typeof sizeClasses;
};

export function LogoMark({ className, size = "md" }: LogoMarkProps) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full bg-black font-semibold leading-none text-white shadow-sm ring-1 ring-white/10",
        sizeClasses[size],
        className,
      )}
      aria-hidden
    >
      N
    </span>
  );
}
