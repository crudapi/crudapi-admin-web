#!/bin/sh
echo "cp crudpi-admin-web"

cp -R /crudapi/dist/* /crudapi/npm
ls -al /crudapi/npm
nginx -g "daemon off;"
