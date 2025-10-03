# Etapa 1: Build
FROM node:18-alpine AS builder

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Etapa 2: Runtime
FROM node:20-bookworm

WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

RUN npm install --production

EXPOSE 3000
CMD ["node", "dist/main"]
