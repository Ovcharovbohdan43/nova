# NOVA AI Studio — Development Plan (Phase 1 active)

> Полный план: [`../continue-main/DEVELOPMENT_PLAN.md`](../continue-main/DEVELOPMENT_PLAN.md)  
> Код waitlist: `nova-ai-studio/`

## Phase 1 — Waitlist ✅ In progress

**Brand:** NOVA AI Studio  
**Deploy:** Railway (domain TBD → `*.railway.app` until purchased)

### Done

- [x] Monorepo `apps/web` + `packages/database`
- [x] Waitlist landing (hero, demo, pricing, roadmap, FAQ)
- [x] `POST /api/waitlist` + Prisma `WaitlistEntry`
- [x] `GET /api/health`
- [x] Dockerfile + `railway.toml` + GitHub Actions CI
- [x] Dark theme, Lucide icons, shadcn/ui

### Your next steps (deploy)

1. **Supabase** — create project (EU region)
   - Settings → Database → copy `DATABASE_URL` (pooler) and `DIRECT_URL`
2. **Run migration**
   ```bash
   cd nova-ai-studio
   cp apps/web/.env.example apps/web/.env.local
   # paste Supabase URLs
   npm run db:migrate
   ```
3. **Railway** — New Project → Deploy from GitHub → root: `nova-ai-studio`
   - Env: `DATABASE_URL`, `DIRECT_URL`, `NEXT_PUBLIC_APP_URL`
   - Release command: `npm run db:migrate`
4. **Local dev**
   ```bash
   npm run dev
   ```

### Phase 1.1 (next)

- [ ] Resend double opt-in email
- [ ] PostHog analytics
- [ ] OG image (`/opengraph-image`)
- [ ] Custom domain when purchased
