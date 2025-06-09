# web/Dockerfile

FROM node:18-alpine AS builder
WORKDIR /app

# Force install all deps, auch devDependencies
ENV NODE_ENV=development
COPY package*.json ./
RUN npm install

# dann bauen
COPY . .
RUN npm run build

# Production‑Stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
