FROM node:lts-alpine as builder

RUN apk add jq

COPY package.json /crudapi-admin-web/package.json

WORKDIR /crudapi-admin-web
RUN npm install

COPY . /crudapi-admin-web/

WORKDIR /crudapi-admin-web

RUN npm run build

RUN version=`cat package.json | jq .version | sed 's/\"//g'` && \
    echo $version && \
    mkdir -p /opt/crudapi/crudapi-admin-web/release/$version && \
    npm run build && \
    cd ./dist/spa && \
    tar -zcvf crudapi-admin-web-$version.tar.gz crudapi && \
    cp ./crudapi-admin-web-$version.tar.gz /opt/crudapi/crudapi-admin-web/release/$version

FROM nginx:latest

WORKDIR /crudapi-admin-web

COPY --from=builder /crudapi-admin-web/dist/spa .
COPY --from=builder /opt/crudapi/crudapi-admin-web/release /opt/crudapi/crudapi-admin-web/release/

COPY ./docker/default.conf  /etc/nginx/conf.d/default.conf

EXPOSE 80

COPY run.sh run.sh

CMD ["/crudapi-admin-web/run.sh"]
