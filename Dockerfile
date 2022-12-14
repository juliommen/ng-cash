FROM node:16-alpine AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY . .
RUN npm ci
ENV NEXT_TELEMETRY_DISABLED 1
RUN npx prisma generate
RUN npm run build
RUN mkdir -p /app/.next/cache/images
FROM node:16-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --chown=nextjs:nodejs --from=builder /app/ ./
USER nextjs
ENV PORT 3000
CMD ["npm","start"]