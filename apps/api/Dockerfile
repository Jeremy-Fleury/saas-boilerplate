#####################
# Stage 1: Builder  #
#####################

FROM node:24-alpine AS builder

# Build tools: needed for native modules compilation (dd-trace, etc.)
# These are only in builder stage, not in final image, so they don't increase image size
RUN corepack enable && corepack prepare pnpm@10.0.0 --activate && apk add --no-cache libc6-compat python3 make g++

WORKDIR /app

COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY apps/api/package.json ./apps/api/
COPY packages/api-client/package.json ./packages/api-client/

RUN pnpm install --frozen-lockfile --shamefully-hoist

COPY apps/api ./apps/api
COPY packages ./packages


WORKDIR /app/apps/api
RUN export PATH="/app/node_modules/.bin:$PATH" && /app/node_modules/.bin/prisma generate
RUN /app/node_modules/.bin/nest build

################################
# Stage 2: Production runtime  #
################################

FROM node:24-alpine AS production

RUN corepack enable && corepack prepare pnpm@10.0.0 --activate

WORKDIR /app

COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./

COPY apps/api/package.json ./apps/api/
COPY packages/api-client/package.json ./packages/api-client/

RUN pnpm install --frozen-lockfile --prod --ignore-scripts && pnpm store prune && rm -rf /root/.pnpm-store

COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/apps/api/src/common/database/infrastructure/prisma-client ./apps/api/src/common/database/infrastructure/prisma-client
COPY --from=builder /app/apps/api/prisma.config.ts ./apps/api/
COPY --from=builder /app/apps/api/prisma/schema ./apps/api/prisma/schema
COPY --from=builder /app/apps/api/prisma/migrations ./apps/api/prisma/migrations

WORKDIR /app/apps/api

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && adduser -S nestjs -u 1001 && chown -R nestjs:nodejs /app
USER nestjs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

CMD ["pnpm", "start:prod"]
