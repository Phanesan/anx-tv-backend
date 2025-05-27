# Builder
FROM node:22.15.1-alpine3.20 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Runner
FROM node:22.15.1-alpine3.20

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json .

USER node

EXPOSE 3000

CMD ["node", "dist/main.js"]