> Install requirements

```
npm install
```

> Add nginx config in /etc/nginx/sites-enabled/default

```
server {
  listen 80;
  server_name localhost;
  access_log /var/log/nginx/example.log;

  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_redirect off;

    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  }

  # browser-sync workaround
  location /browser-sync/socket.io/ {
    proxy_pass http://127.0.0.1:3000;
    proxy_redirect off;
    proxy_buffering off;

    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "Upgrade";

  }
}
```
