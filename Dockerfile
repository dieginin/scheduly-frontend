FROM node:25.6.1-alpine3.23 AS deps
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile


FROM node:25.6.1-alpine3.23 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ARG VITE_SCHEDULY_API_URL=/api
ENV VITE_SCHEDULY_API_URL=$VITE_SCHEDULY_API_URL
RUN yarn build


FROM nginx:1.28.2-alpine3.23 AS prod
COPY --from=builder /app/dist /usr/share/nginx/html
COPY public/ /usr/share/nginx/html/public
COPY nginx/ /etc/nginx/conf.d


CMD [ "nginx","-g","daemon off;"]