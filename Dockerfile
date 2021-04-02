FROM node:lts-alpine as builder

COPY package.json /crudapi-admin-web/package.json

WORKDIR /crudapi-admin-web
RUN npm install

COPY . /crudapi-admin-web/

WORKDIR /crudapi-admin-web

RUN ls -al

RUN npm run build

RUN ls /crudapi-admin-web/dist

FROM nginx:latest

WORKDIR /crudapi-admin-web

COPY --from=builder /crudapi-admin-web/dist/spa .

RUN ls /crudapi-admin-web

COPY ./docker/default.conf  /etc/nginx/conf.d/default.conf

EXPOSE 80
