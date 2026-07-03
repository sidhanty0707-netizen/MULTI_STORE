# 🚀 Multi Store Order Management System

A Full Stack Order Management System built using **Next.js, React, Node.js, Express.js, MySQL and Socket.IO**.

This project was developed as part of a Full Stack Developer Assessment.

---

# 📌 Features

## Task 1 - Multi Store Order Management

✅ Create Order

✅ View Orders

✅ Filter Orders by Store

✅ Pagination Support

✅ Update Order Status

✅ API Validation

---

## Task 2 - Real Time Notification

✅ Socket.IO Integration

✅ Real Time Order Creation Updates

✅ Real Time Status Updates

---

## Task 3 - Analytics & Archival

✅ Archive Orders older than 30 days

✅ Orders Per Day Analytics

✅ Revenue Per Store

✅ Top 5 Selling Items

---

# 🛠 Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Bootstrap
- Axios
- Socket.IO Client

### Backend

- Node.js
- Express.js
- MySQL
- Socket.IO
- Express Validator

---

# 📁 Project Structure

```
MULTI_STORE

│

├── backend

│ ├── config

│ ├── controllers

│ ├── middleware

│ ├── routes

│ ├── socket

│ ├── server.js

│

├── frontend

│ ├── app

│ ├── components

│ ├── services

│

├── README.md
```

---

# ⚙ Installation

## Clone Repository

```bash
git clone https://github.com/sidhanty0707-netizen/MULTI_STORE.git
```

```
cd MULTI_STORE
```

---

# Backend Setup

```
cd backend
```

Install Packages

```
npm install
```

Create `.env`

```
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=multi_store
PORT=5000
```

Run Backend

```
npm run dev
```

Backend

```
http://localhost:5000
```

---

# Frontend Setup

```
cd frontend
```

Install Packages

```
npm install
```

Run Frontend

```
npm run dev
```

Frontend

```
http://localhost:3000
```

---

# 📌 API Endpoints

## Create Order

```
POST /orders
```

---

## Get Orders

```
GET /orders?store_id=1&page=1&limit=10
```

---

## Update Order Status

```
PATCH /orders/:id/status
```

---

## Archive Old Orders

```
POST /orders/archive-old
```

---

## Orders Per Day

```
GET /orders/analytics/orders-per-day
```

---

## Revenue Per Store

```
GET /orders/analytics/revenue
```

---

## Top Selling Items

```
GET /orders/analytics/top-items
```

---

# 📷 Screenshots

## Home

```
screenshots/home.png
```

## Create Order

```
screenshots/create-order.png
```

## Orders List

```
screenshots/orders-list.png
```

## Update Status

```
screenshots/update-status.png
```

## Analytics

```
screenshots/analytics.png
```

---

# Database

MySQL

Tables

- orders
- orders_archive

Indexes

- store_id
- created_at

---

# Socket.IO Events

### New Order

```
orderCreated
```

### Status Updated

```
orderUpdated
```

---

# Future Improvements

- Docker Support
- Deployment on Vercel
- Deployment on Render
- Authentication
- Role Based Access
- Better Dashboard UI
- React Query Integration

---

# Author

**Sidhant Yadav**

GitHub

https://github.com/sidhanty0707-netizen

---

# License

MIT License
