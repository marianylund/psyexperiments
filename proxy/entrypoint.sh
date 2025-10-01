#!/usr/bin/env bash
set -euo pipefail

: "${SERVER_NAME:?SERVER_NAME env is required (e.g. example.com)}"
: "${EMAIL:?EMAIL env is required for certbot registration}"

TEMPLATE=/etc/nginx/templates/nginx.conf.template
CONF=/etc/nginx/nginx.conf

# Default upstreams
FRONTEND_HOST="${FRONTEND_HOST:-frontend}"
FRONTEND_PORT="${FRONTEND_PORT:-8080}"
BACKEND_HOST="${BACKEND_HOST:-backend}"
BACKEND_PORT="${BACKEND_PORT:-3001}"

# Render template
sed -e "s|{{SERVER_NAME}}|$SERVER_NAME|g" \
    -e "s|{{FRONTEND_HOST}}|$FRONTEND_HOST|g" \
    -e "s|{{FRONTEND_PORT}}|$FRONTEND_PORT|g" \
    -e "s|{{BACKEND_HOST}}|$BACKEND_HOST|g" \
    -e "s|{{BACKEND_PORT}}|$BACKEND_PORT|g" \
    "$TEMPLATE" > "$CONF"

# Start nginx in background for HTTP-01 challenge
nginx -g 'daemon on;'

# Obtain/renew certs
certbot --nginx -n --agree-tos --email "$EMAIL" -d "$SERVER_NAME" --redirect || true

# Restart nginx to load certs
nginx -s reload || true

sleep infinity
