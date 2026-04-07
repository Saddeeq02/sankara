#!/bin/sh

# 🛡️ Ensure critical directories have correct permissions
# ---------------------------------------------------------
echo "Configuring permissions for storage and uploads..."
chown -R www-data:www-data /var/www/backend/storage /var/www/backend/bootstrap/cache /var/www/backend/public/uploads
chmod -R 775 /var/www/backend/storage /var/www/backend/bootstrap/cache /var/www/backend/public/uploads



# 🌐 Map the Render $PORT to Nginx config
# ---------------------------------------------------------
if [ -z "$PORT" ]; then
  export PORT=80
fi
echo "Mapping Nginx to listen on PORT: $PORT"
sed -i "s/listen 80;/listen $PORT;/g" /etc/nginx/http.d/default.conf

# 🚀 Run Database Migrations
# ---------------------------------------------------------
echo "Running database migrations..."
cd /var/www/backend && php artisan migrate --force

# 🚀 Start PHP-FPM in background
# ---------------------------------------------------------
echo "Starting PHP-FPM 8.4..."
php-fpm -D


# 🚀 Start Nginx in foreground
# ---------------------------------------------------------
echo "Starting Nginx Gateway..."
nginx -g 'daemon off;'
