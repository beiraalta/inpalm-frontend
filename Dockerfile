FROM node:18-alpine as builder
WORKDIR /app
COPY . .
RUN npm install
RUN npx expo export:web
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
