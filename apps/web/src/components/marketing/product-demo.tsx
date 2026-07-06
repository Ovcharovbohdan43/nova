import { Download, FileCode2, FolderTree, MessageSquare } from "lucide-react";

import { Reveal } from "@/components/marketing/reveal";

const demoLines = [
  { type: "user", text: "Build a Next.js waitlist for my micro-SaaS idea" },
  { type: "agent", text: "Creating app structure, API route, Prisma schema…" },
  { type: "file", text: "src/app/api/waitlist/route.ts" },
  { type: "file", text: "prisma/schema.prisma" },
  { type: "agent", text: "Ready. Export to ZIP or push to GitHub." },
];

export function ProductDemo() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:py-24">
      <div className="mx-auto max-w-5xl">
        <Reveal className="mb-10 text-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Describe it. NOVA builds it. You keep it.
          </h2>
          <p className="mt-3 text-muted-foreground">
            A browser studio that ends with code in your repository — not on our
            servers.
          </p>
        </Reveal>

        <Reveal delay={150}>
          <div className="nova-demo-shell overflow-hidden rounded-2xl border border-border/60 bg-card/50 shadow-2xl shadow-primary/5 ring-1 ring-white/5">
            <div className="flex items-center gap-2 border-b border-border/60 bg-muted/30 px-4 py-3">
              <div className="flex gap-1.5">
                <span className="size-3 rounded-full bg-red-500/80 transition-transform duration-300 hover:scale-125" />
                <span className="size-3 rounded-full bg-amber-500/80 transition-transform duration-300 hover:scale-125" />
                <span className="size-3 rounded-full bg-emerald-500/80 transition-transform duration-300 hover:scale-125" />
              </div>
              <span className="ml-2 font-mono text-xs text-muted-foreground">
                nova-ai-studio — session
              </span>
            </div>

            <div className="grid lg:grid-cols-5">
              <div className="border-b border-border/60 p-4 lg:col-span-2 lg:border-b-0 lg:border-r">
                <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  <MessageSquare className="size-3.5" />
                  Agent
                </div>
                <ul className="space-y-3">
                  {demoLines.map((line, i) => (
                    <li
                      key={i}
                      className="animate-fade-up text-sm"
                      style={{ animationDelay: `${i * 0.35}s` }}
                    >
                      {line.type === "user" && (
                        <p className="rounded-lg bg-muted/50 px-3 py-2 text-foreground transition-colors duration-300 hover:bg-muted/70">
                          {line.text}
                        </p>
                      )}
                      {line.type === "agent" && (
                        <p className="text-muted-foreground">{line.text}</p>
                      )}
                      {line.type === "file" && (
                        <p className="flex items-center gap-2 font-mono text-xs text-primary transition-all duration-300 hover:translate-x-1 hover:text-primary/90">
                          <FileCode2 className="size-3.5 shrink-0" />
                          {line.text}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 lg:col-span-3">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    <FolderTree className="size-3.5" />
                    Workspace
                  </div>
                  <div className="flex cursor-default items-center gap-1.5 rounded-md border border-primary/30 bg-primary/10 px-2 py-1 text-xs text-primary transition-all duration-500 hover:border-primary/50 hover:bg-primary/20 hover:shadow-[0_0_20px_-4px_oklch(0.78_0.14_195_/_45%)]">
                    <Download className="size-3 transition-transform duration-300 hover:scale-110" />
                    Export ZIP
                  </div>
                </div>
                <pre className="overflow-x-auto rounded-lg bg-background/80 p-4 font-mono text-xs leading-relaxed text-muted-foreground ring-1 ring-border/40 transition-all duration-500 hover:ring-primary/20">
                  <code>{`// api/waitlist/route.ts
export async function POST(req: Request) {
  const { email } = await req.json();
  await prisma.waitlistEntry.create({ data: { email } });
  return Response.json({ ok: true });
}`}</code>
                </pre>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
