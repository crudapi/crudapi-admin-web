#!/bin/sh
echo "cp crudpi-admin-web"

cp -R /opt/crudapi/crudapi-admin-web/release/* /crudapi/npm
ls -al /crudapi/npm
nginx -g "daemon off;"
