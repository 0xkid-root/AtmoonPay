


# 📄 README.md

```md
# 💸 Payout Dashboard (Technical Assignment)

This project is a full-stack **Payout Dashboard** built as part of a technical assignment.

It allows a user to:
- Log in
- View available balance
- Create payouts
- View payout history with status

---

## 🚀 Tech Stack

### Frontend
- React 18 (Vite)
- Tailwind CSS
- Axios (HTTP client)
- React Router

### Backend
- Java 17
- Spring Boot 3
- Spring Data JPA
- H2 Database (In-memory)
- JWT Authentication

---

## 📂 Project Structure

```

root/
├── frontend/
│ ├── src/
│ │ ├── api/ # Axios client & API calls
│ │ ├── hooks/ # Custom hooks (useAuth, usePayouts, useBalance)
│ │ ├── components/ # UI components
│ │ ├── pages/ # Login & Dashboard pages
│ │ ├── App.tsx
│ │ └── main.tsx
│
├── backend/
│ ├── controller/ # REST controllers
│ ├── service/ # Business logic
│ ├── repository/ # JPA repositories
│ ├── entity/ # Database entities
│ └── config/ # JWT & security config
│
└── README.md
```

---

## 🔐 Authentication

- Login is done using static credentials:
```

Username: demo
Password: demo

```

- On successful login:
- Backend returns a JWT token
- Token is stored in localStorage
- Axios interceptor attaches token to every request

- Protected routes are implemented in frontend using `ProtectedRoute`

---

## ⚙️ API Endpoints

### 1. Login

```

POST /api/auth/login

````

**Request Body**
```json
{
  "username": "demo",
  "password": "demo"
}
````

**Response**

```json
{
  "message": "Login successful",
  "token": "JWT_TOKEN"
}
```

---

### 2. Get Balance

```
GET /api/balance
```

**Response**

```json
5000
```

---

### 3. Create Payout

```
POST /api/payouts
```

**Request Body**

```json
{
  "recipientEmail": "user@example.com",
  "amount": 100,
  "note": "Payment"
}
```

**Response**

```json
{
  "id": 1,
  "recipientEmail": "...",
  "amount": 100,
  "status": "Pending",
  "note": "...",
  "createdAt": "2026-04-17T01:23:54"
}
```

---

### 4. Get All Payouts

```
GET /api/payouts
```

**Response**

```json
[
  {
    "id": 1,
    "recipientEmail": "...",
    "amount": 100,
    "status": "Pending",
    "note": "...",
    "createdAt": "..."
  }
]
```

---

## 🧠 Key Features

### ✅ Frontend

* Clean Login UI
* Dashboard with:

  * Available balance
  * Payout creation form
  * Payout history table
* Custom hooks for clean logic separation:

  * `useAuth`
  * `usePayouts`
  * `useBalance`
* Axios interceptor for token handling
* Protected routes for authentication
* Loading states and basic error handling

---

### ✅ Backend

* RESTful API with Spring Boot
* JWT-based authentication
* H2 in-memory database
* Payout entity stored with:

  * ID
  * Email
  * Amount
  * Note
  * Status (default: Pending)
  * Timestamp

---

## ▶️ How to Run

### Backend (Port 8080)

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

* H2 Console:

  ```
  http://localhost:8080/h2-console
  ```

  * JDBC URL: `jdbc:h2:mem:testdb`
  * Username: `sa`
  * Password: (leave empty)

---

### Frontend (Port 3000)

```bash
cd frontend
npm install
npm run dev
```

---

## 📸 Screenshots

* Login Page
* Dashboard with payout list

### 🔐 Login Page
![Login Page](assets/login.png)

### 📊 Dashboard
![Dashboard](assets/dashboard.png)

### 📋 H2 Database History
![H2 Database](assets/h2database.png)

---

## ⚠️ Challenges Faced

1. Understanding H2 Database

Initially, I was not familiar with H2 Database. I researched:

What is an in-memory database
How H2 works with Spring Boot
Why it's useful for testing (no external DB setup required)

Learning:
H2 is a lightweight, in-memory database that runs inside the application and resets on restart, making it perfect for quick development and testing.

2. Spring Boot Project Setup (Java 17)

Setting up backend with:

Java 17
Spring Boot 3
Maven dependencies

I faced issues in:

Project structure understanding
Proper layering (Controller → Service → Repository → Entity)

Solution:
I followed best practices and created a clean architecture:

controller/
service/
repository/
entity/
config/

Learning:
Proper folder structure makes the project scalable and easier to maintain.

3. JWT Authentication Issue

* JWT compatibility issue with Java 17 (fixed by updating jjwt dependencies)
* Mapping backend response to UI format
* Handling authentication and protected routes cleanly

---
