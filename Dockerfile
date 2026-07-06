FROM node:22-slim AS base
WORKDIR /app
RUN apt-get update \
    && apt-get install -y --no-install-recommends openssl ca-certificates \
    && rm -rf /var/lib/apt/lists/*

FROM base AS deps
COPY package.json package-lock.json ./
COPY apps/web/package.json ./apps/web/
COPY packages/database/package.json ./packages/database/
RUN npm ci \
    && npm install --no-save \
        lightningcss-linux-x64-gnu@1.32.0 \
        @tailwindcss/oxide-linux-x64-gnu@4.3.2 \
        --workspace=web

FROM base AS builder
# Copy full deps tree (workspace bins live in apps/web/node_modules/.bin)
COPY --from=deps /app ./
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
ARG DATABASE_URL="postgresql://build:build@localhost:5432/build"
ARG NEXT_PUBLIC_APP_URL="http://localhost:3000"
ENV DATABASE_URL=$DATABASE_URL
ENV NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL
RUN npm run db:generate
RUN npm run build --workspace=web

FROM base AS runner
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /app

COPY --from=builder /app/apps/web/public ./apps/web/public
COPY --from=builder /app/apps/web/.next/standalone ./
COPY --from=builder /app/apps/web/.next/static ./apps/web/.next/static

# Release command: prisma migrate deploy
COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/packages/database ./packages/database

ENV HOSTNAME=0.0.0.0
ENV PORT=3000
EXPOSE 3000

CMD ["node", "apps/web/server.js"]
