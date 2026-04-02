# Sankara Nigeria Limited - Agricultural Machinery Portal

A premium, full-stack web application for managing agricultural machinery sales, inventory, and customer inquiries.

## Project Architecture

This project is a monorepo containing two main components:

- **`/frontend`**: A modern, high-performance Single Page Application (SPA) built with **Vite**, **Vanilla JS**, and **Lucide Icons**. It features a premium industrial design, dynamic product catalogs, and an integrated Admin Dashboard.
- **`/backend`**: A simplified **Laravel API** that serves as the service layer. It handles authentication, product management, and uses a custom `JsonDB` helper for lightweight, persistent storage (`storage/app/db.json`).

---

## Getting Started

### 1. Prerequisites
- **Node.js** (v18+)
- **PHP** (v8.2+)

### 2. Run the Backend (API)
Navigate to the backend directory and start the PHP development server:
```bash
cd backend
php -S 0.0.0.0:8080 -t public/
```
*The API will be available at `http://localhost:8080`*

### 3. Run the Frontend (Site)
Navigate to the frontend directory, install dependencies, and start the Vite dev server:
```bash
cd frontend
npm run dev
```
*The website will be available at `http://localhost:5174`*

---

## Core Features
- **Product Management**: Full CRUD specifically tailored for heavy machinery.
- **Admin Dashboard**: Secure portal for inventory control and status toggling (Active/Suspended).
- **Search & Filter**: Real-time machinery catalog filtering by category and keywords.
- **Inquiry System**: Customer contact form integration with admin tracking.
- **Premium UI**: Custom-built with industrial aesthetics, glassmorphism, and smooth animations.

---

## License
© 2026 Sankara Nigeria Limited. All rights reserved.
