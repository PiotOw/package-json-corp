FROM node:alpine AS package-json-corp-build
WORKDIR /app
COPY . .
RUN npm ci && node --max_old_space_size=4096 node_modules/@angular/cli/bin/ng build

FROM nginx:alpine
COPY --from=package-json-corp-build /app/dist/package-json-corp /usr/share/nginx/html
EXPOSE 80