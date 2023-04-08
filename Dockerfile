#FROM node:14-alpine as builder
FROM registry.cn-qingdao.aliyuncs.com/dh-mirror/node:14-alpine as builder

RUN apk add jq

COPY package.json /crudapi-admin-web/package.json

WORKDIR /crudapi-admin-web
RUN npm install

COPY . /crudapi-admin-web/

WORKDIR /crudapi-admin-web

RUN npm run build && \
    version=`cat package.json | jq .version | sed 's/\"//g'` && \
    echo $version && \
    mkdir -p /crudapi/dist/crudapi-admin-web/$version && \
    cd ./dist/spa && \
    tar -zcvf crudapi-admin-web-$version.tar.gz crudapi && \
    cp ./crudapi-admin-web-$version.tar.gz /crudapi/dist/crudapi-admin-web/$version && \
    rm -rf crudapi-admin-web-$version.tar.gz

#FROM nginx:latest
FROM registry.cn-qingdao.aliyuncs.com/dh-mirror/nginx:latest as builder

WORKDIR /crudapi-admin-web

COPY --from=builder /crudapi-admin-web/dist/spa .
COPY --from=builder /crudapi/dist /crudapi/dist/

COPY ./docker/default.conf  /etc/nginx/conf.d/default.conf

EXPOSE 80

COPY run.sh run.sh

CMD ["/crudapi-admin-web/run.sh"]
