## docker
```bash
docker build -t crudapi-admin-web:latest .
docker rm -f crudapi-admin-web
docker run -d -p 80:80 --name crudapi-admin-web crudapi-admin-web:latest
```
