function normalizeAppUrl(raw: string | undefined): string {
  const value = raw?.trim() || "http://localhost:3000";
  if (/^https?:\/\//i.test(value)) return value;
  return `https://${value.replace(/^\/+/, "")}`;
}

export const brand = {
  name: "NOVA AI Studio",
  shortName: "NOVA",
  tagline: "Ship faster. Spend less.",
  description:
    "NOVA is a browser-based AI dev studio that automatically chooses the cheapest model that can handle your task — so you build more and waste nothing on tokens. Full repo workflow. BYOK-ready. Cost-aware AI for indie developers.",
  url: normalizeAppUrl(process.env.NEXT_PUBLIC_APP_URL),
} as const;

export const pricingTiers = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Local-first. Zero platform inference cost.",
    features: [
      "Ollama & local models",
      "Basic AI chat",
      "Local project memory",
      "GitHub read-only sync",
    ],
    highlighted: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: "$15",
    period: "/month",
    description: "The indie builder's daily driver.",
    features: [
      "Smart AI Router",
      "OpenRouter & premium models",
      "Cloud project memory",
      "Background agents",
      "Cost dashboard & AI credits",
      "Export ZIP & GitHub push",
    ],
    highlighted: true,
    badge: "Founding member pricing",
  },
  {
    id: "team",
    name: "Team",
    price: "$40",
    period: "/user/mo",
    description: "For small teams shipping fast.",
    features: [
      "Everything in Pro",
      "Shared project memory",
      "PR review assistant",
      "Team usage analytics",
      "Role-based access",
    ],
    highlighted: false,
  },
] as const;

export const roadmap = [
  { phase: "Now", title: "Waitlist", status: "active" as const },
  { phase: "Q3 2026", title: "Private beta", status: "upcoming" as const },
  { phase: "Q4 2026", title: "Web Studio", status: "upcoming" as const },
  { phase: "2027", title: "VS Code extension", status: "upcoming" as const },
];

export const faqItems = [
  {
    question: "How is NOVA different from Cursor or Bolt?",
    answer:
      "Cursor is a daily IDE for pros. Bolt optimizes for hosted apps. NOVA is built for indie devs who want a side project tonight — with full code ownership, smart cost routing, and export to your GitHub.",
  },
  {
    question: "Do I own the code?",
    answer:
      "Yes. Every file the agent writes is yours. Export as ZIP or push to your GitHub repository. No platform lock-in.",
  },
  {
    question: "What is the Smart AI Router?",
    answer:
      "NOVA automatically picks the right model for each task — local Ollama for simple edits, cost-efficient cloud models for explanations, premium models only when the task demands it.",
  },
  {
    question: "Can I use my own API keys (BYOK)?",
    answer:
      "Yes. Pro tier supports Bring Your Own Key for OpenRouter, OpenAI, Anthropic, and more. You control inference costs directly.",
  },
  {
    question: "When will I get access?",
    answer:
      "Waitlist members receive invites in order. Founding members on Pro tier get priority beta access and locked-in pricing.",
  },
  {
    question: "Is NOVA open source?",
    answer:
      "Built on an Apache 2.0 fork of Continue. Core agent infrastructure will remain auditable and self-hostable for Enterprise.",
  },
];
