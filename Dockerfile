FROM node:alpine AS package-json-corp-build
WORKDIR /app
COPY . .
RUN npm ci && npm run build

FROM nginx:alpine
COPY --from=package-json-corp-build /app/dist/package-json-corp /usr/share/nginx/html
EXPOSE 80