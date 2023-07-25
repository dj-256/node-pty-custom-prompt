FROM node:18.16.0 as builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:1.25.0-alpine
COPY --from=builder /usr/src/app/dist/front /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/nginx.conf
