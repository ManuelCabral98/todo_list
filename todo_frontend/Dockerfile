# Stage 1: Build 
# use node just for build the project
FROM node:20-slim AS build-stage

WORKDIR /app

# copy dependencies inside of our work directory. Then download libraries from internet
COPY package.json package-lock.json ./
RUN npm ci

# copy the whole code inside of Docker container and build
COPY . .
RUN npm run build

# Stage 2: Production
# use nginx for production
FROM nginx:alpine AS production-stage

# copy static files built in node to nginx folder
COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80

# run nginx
CMD ["nginx","-g","daemon off;"]