#! /bin/bash

cat <<< "VITE_COVERAGE=${VITE_COVERAGE}
NODE_ENV=${NODE_ENV}
REDIS_PORT=${REDIS_PORT}
REDIS_HOST=${REDIS_HOST}
REDIS_URL=redis://${REDIS_HOST}:${REDIS_PORT}
AUTH_SECRET=${AUTH_SECRET}
YOUTUBE_API_KEY=${YOUTUBE_API_KEY}
AUTH_GOOGLE_ID=${AUTH_GOOGLE_ID}
AUTH_GOOGLE_SECRET=${AUTH_GOOGLE_SECRET}
DB_HOST=${DB_HOST}
DB_USER=${DB_USER}
DB_PASS=${DB_PASS}
DB_NAME=${DB_NAME}
DB_PORT=${DB_PORT}
DATABASE_URL=postgresql://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}" > .env.test