# syntax=docker/dockerfile:1.4

# ---------- deps ----------

FROM node:24-slim AS deps

RUN corepack enable
WORKDIR /repo
ENV HUSKY=0

COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY apps/api/package.json apps/api/package.json

RUN pnpm install --frozen-lockfile

# ---------- build ----------

FROM node:24-slim AS build
WORKDIR /repo
RUN corepack enable

RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

COPY . .
COPY --from=deps /repo/node_modules /repo/node_modules
COPY --from=deps /repo/apps/api/node_modules /repo/apps/api/node_modules

RUN DATABASE_URL="postgresql://fake-database-url" pnpm --filter api prisma:generate
RUN pnpm --filter api build

# ---------- runtime ----------
 
FROM node:24-slim AS runtime
WORKDIR /repo
RUN corepack enable
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

COPY --from=build /repo/apps/api/dist ./apps/api/dist
COPY --from=build /repo/node_modules ./node_modules
COPY --from=build /repo/apps/api/node_modules ./apps/api/node_modules
COPY --from=build /repo/package.json ./package.json
COPY --from=build /repo/apps/api/prisma ./apps/api/prisma

EXPOSE 3000

CMD ["node", "apps/api/dist/src/main.js"]