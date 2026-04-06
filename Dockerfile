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

# --- Backend Setup ---
RUN mkdir -p /var/www/backend
WORKDIR /var/www/backend
COPY backend/ .
RUN composer install --no-interaction --optimize-autoloader --no-dev

# --- Frontend Setup ---
RUN mkdir -p /var/www/frontend
COPY --from=build-stage /app/dist /var/www/frontend

# 🛡️ Configure PHP-FPM to use custom config for logging & connectivity
COPY php-fpm.conf /usr/local/etc/php-fpm.d/www.conf

# 🛡️ Configure Nginx to run as www-data (same as PHP-FPM)
RUN sed -i "s/user nginx;/user www-data;/g" /etc/nginx/nginx.conf

# 🌐 Nginx Config Mapping
COPY nginx.conf /etc/nginx/http.d/default.conf

# 📂 Copy Entrypoint Script
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# 🪵 Redirect Nginx logs to stdout/stderr
RUN ln -sf /dev/stdout /var/log/nginx/access.log && ln -sf /dev/stderr /var/log/nginx/error.log

# Expose Port 80 (Overridden by Render $PORT in entrypoint)
EXPOSE 80

ENTRYPOINT ["/entrypoint.sh"]



