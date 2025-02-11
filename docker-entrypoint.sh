#!/bin/sh

# In Cloud Run, PORT environment variable is provided
# If PORT is set (Cloud Run), use it for CONTAINER_PORT
if [ ! -z "$PORT" ]; then
    export CONTAINER_PORT=$PORT
fi

export CONTAINER_PORT="${CONTAINER_PORT:-8080}"
export HOST="${HOST:-localhost}"

# Replace environment variables in nginx.conf
envsubst '${CONTAINER_PORT} ${HOST}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf

# Start nginx
exec nginx -g 'daemon off;'
