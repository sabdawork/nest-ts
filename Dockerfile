FROM node:22-alpine AS base

RUN apk add --no-cache curl

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@latest --activate

# ---- Dependencies stage ----
FROM base AS dependencies

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# ---- Build stage ----
FROM base AS build

WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules

RUN pnpm build
RUN pnpm prune --prod --ignore-scripts

# ---- Production stage ----
FROM node:22-alpine AS deploy

RUN apk add --no-cache curl

WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY package.json ./

EXPOSE 8000
CMD ["node", "dist/main"]
