# 🚀 Multi Store Order Management System

A Full Stack Order Management System built using **Next.js, React, Node.js, Express.js, MySQL and Socket.IO**.

This project was developed as part of a Full Stack Developer Assessment.


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


# 📁 Project Structure

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


## Create Order 
 Base URL
http://localhost:5000
```
POST 

1. Create Order  POST

http://localhost:5000/orders

2. Get Orders GET

http://localhost:5000/orders 



3. Get Orders by Store  GET

 http://localhost:5000/orders?store_id=1

4.Get Orders with Pagination GET

http://localhost:5000/orders/1/status

5. Update Order Status  PATCH

http://localhost:5000/orders/1/status

6. Archive Old Orders  POST

http://localhost:5000/orders/archive-old

7. Orders Per Day GET

http://localhost:5000/orders/analytics/orders-per-day

8. Revenue Per Store GET

http://localhost:5000/orders/analytics/revenue

9. Top Selling Items GET

http://localhost:5000/orders/analytics/top-items



# Author

**Sidhant Yadav**

GitHub

https://github.com/sidhanty0707-netizen


git clone https://github.com/sidhanty0707-netizen/MULTI_STORE.git


drive link -https://1drv.ms/u/c/3D1938942FBFCA8D/IQDd_Iw84DK_QJIL0NWHXGMoAZL5b7_eEnnIJY_irHkxSNQ?e=Jdh7og
