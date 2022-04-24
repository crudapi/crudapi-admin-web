#!/bin/sh
echo "cp crudpi-admin-web"

cp -R /opt/crudapi/* /crudapi/npm
ls -al /crudapi/npm
nginx -g "daemon off;"
