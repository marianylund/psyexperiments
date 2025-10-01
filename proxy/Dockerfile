FROM nginx:1.27-alpine

RUN apk add --no-cache certbot certbot-nginx bash openssl

WORKDIR /etc/nginx

# Copy templated nginx config and entrypoint
COPY nginx.conf.template /etc/nginx/templates/nginx.conf.template
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Nginx logs to stdout/stderr
RUN ln -sf /dev/stdout /var/log/nginx/access.log \ 
  && ln -sf /dev/stderr /var/log/nginx/error.log

EXPOSE 80 443

ENTRYPOINT ["/entrypoint.sh"]



