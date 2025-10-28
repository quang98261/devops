#!/bin/sh

# Usage: /wait-for-db.sh <cmd...>
# Wait for MySQL to be available using SPRING_DATASOURCE_URL env or fallback to localhost

# Extract host and port from SPRING_DATASOURCE_URL if present
DB_HOST=localhost
DB_PORT=3306
if [ -n "$SPRING_DATASOURCE_URL" ]; then
  # expected format: jdbc:mysql://host:port/dbname?... 
  HOSTPORT=$(echo "$SPRING_DATASOURCE_URL" | sed -n 's#.*mysql://\([^/]*\)/.*#\1#p')
  if [ -n "$HOSTPORT" ]; then
    DB_HOST=$(echo "$HOSTPORT" | cut -d':' -f1)
    DB_PORT=$(echo "$HOSTPORT" | cut -d':' -f2)
    DB_PORT=${DB_PORT:-3306}
  fi
fi

echo "Waiting for MySQL at $DB_HOST:$DB_PORT..."

max_retries=30
i=0
while ! nc -z "$DB_HOST" "$DB_PORT"; do
  i=$((i+1))
  if [ $i -ge $max_retries ]; then
    echo "Timeout waiting for MySQL at $DB_HOST:$DB_PORT"
    exit 1
  fi
  sleep 2
done

echo "MySQL reachable at $DB_HOST:$DB_PORT, starting app..."

# exec the command passed to the script
exec "$@"
