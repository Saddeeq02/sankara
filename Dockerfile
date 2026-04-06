# Root Dockerfile for Render (Unified Service)
# This Dockerfile combines the frontend and backend into a single Web Service

# --- Stage 1: Build Frontend ---
FROM node:20-alpine AS build-stage
WORKDIR /app
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

# --- Stage 2: Unified Production Environment ---
FROM php:8.4-fpm-alpine

# Install Nginx and required dependencies
RUN apk add --no-cache nginx libpng-dev oniguruma-dev libxml2-dev zip unzip libzip-dev

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip

# Get latest Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www

# Copy Backend Source
COPY backend/ .
RUN composer install --no-interaction --optimize-autoloader --no-dev

# Copy Built Frontend into Backend Public folder
# This allows Nginx to serve the SPA and API from the same port
COPY --from=build-stage /app/dist /var/www/public

# Set permissions
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache /var/www/public/uploads
RUN chmod -R 775 /var/www/storage /var/www/bootstrap/cache /var/www/public/uploads

# Configure Nginx
COPY nginx.conf /etc/nginx/http.d/default.conf

# Expose Port 80 (Render's default)
EXPOSE 80

# Entrypoint script to run both PHP-FPM and Nginx
RUN printf "#!/bin/sh\nphp-fpm -D\nnginx -g 'daemon off;'\n" > /entrypoint.sh && chmod +x /entrypoint.sh

CMD ["/entrypoint.sh"]
