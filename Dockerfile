FROM oven/bun:1.2.4 AS builder
WORKDIR /app
COPY bun.lock package.json ./
RUN bun install --frozen-lockfile --ignore-scripts
COPY . .
RUN bun run build

FROM oven/bun:1.2.4 AS runtime
WORKDIR /app
COPY bun.lock package.json ./
RUN bun install --frozen-lockfile --production
COPY .env* .
COPY --from=builder /app/dist dist

EXPOSE 3000
ENTRYPOINT ["bun", "--env-file=", "dist/main.js"]
