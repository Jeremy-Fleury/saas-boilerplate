# ---------- deps ----------
FROM node:24-slim AS deps
RUN corepack enable && corepack prepare pnpm@10.28.1 --activate
WORKDIR /repo
ENV HUSKY=0

COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY apps/api/package.json apps/api/package.json
COPY apps/client/package.json apps/client/package.json
COPY packages/api-client/package.json packages/api-client/package.json

RUN pnpm install --frozen-lockfile

# ---------- build ----------

FROM node:24-slim AS build
WORKDIR /repo
RUN corepack enable && corepack prepare pnpm@10.28.1 --activate

RUN apt-get update -y && apt-get install -y openssl ca-certificates && rm -rf /var/lib/apt/lists/*

COPY . .
COPY --from=deps /repo/node_modules /repo/node_modules
COPY --from=deps /repo/apps/api/node_modules /repo/apps/api/node_modules
COPY --from=deps /repo/apps/client/node_modules /repo/apps/client/node_modules
COPY --from=deps /repo/packages/api-client/node_modules /repo/packages/api-client/node_modules

RUN DATABASE_URL="postgresql://fake-database-url" pnpm --filter api prisma:generate
RUN NODE_ENV="openapi" pnpm --filter api openapi:export
RUN pnpm --filter api-client build
RUN pnpm --filter client build

# ---------- runtime ----------

FROM nginx:1.27-alpine AS runtime

COPY apps/client/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /repo/apps/client/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]