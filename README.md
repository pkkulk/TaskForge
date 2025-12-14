<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/e9b99055-223a-4fb9-a7ca-bab573eb2a42" />
<img width="1366" height="768" alt="image" src ="https://github.com/user-attachments/assets/927c0d75-4fbc-4ee6-b7e8-2bf306f6adaa" />  <img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/fa0f3d48-3a77-4956-9fab-38118a21f8e2" />

## 📝 Task Management Application (Full Stack)

A full-stack **Task Management Application** with **JWT authentication**, allowing users to register, log in, and manage their own tasks securely.

Built using **Node.js, Express, TypeScript, Prisma, PostgreSQL**, and a **React frontend**.

---

## 🚀 Features

### 🔐 Authentication

* User registration with hashed passwords
* User login with JWT token generation
* Secure authentication using JSON Web Tokens
* Protected routes using middleware

### ✅ Task Management

* Create tasks
* View user-specific tasks
* Update tasks
* Delete tasks
* Each task belongs to a single authenticated user

### 🛡 Security

* Password hashing with bcrypt
* JWT-based authorization
* Users can access **only their own tasks**

---

## 🧱 Tech Stack

### Backend

* Node.js
* Express.js
* TypeScript
* Prisma ORM
* PostgreSQL
* JWT Authentication
* Zod (Validation)

### Frontend

* React
* Vite
* Redux Toolkit
* Axios
* Tailwind CSS

---

## 📁 Project Structure

```
backend/
│
├── prisma/
│   ├── schema.prisma
│   └── migrations/
│
├── src/
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   └── task.controller.ts
│   │
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   └── task.routes.ts
│   │
│   ├── middlewares/
│   │   └── auth.middleware.ts
│   │
│   ├── validators/
│   │   ├── auth.schema.ts
│   │   └── task.schema.ts
│   │
│   ├── utils/
│   │   ├── hash.ts
│   │   ├── jwt.ts
│   │   └── prisma.ts
│   │
│   ├── app.ts
│   └── server.ts
│
├── .env
├── package.json
└── tsconfig.json
```

---

## 🧠 Architecture Diagram

```
Client (Postman / Frontend)
        |
        | HTTP Request
        ↓
Routes (auth.routes.ts / task.routes.ts)
        |
        ↓
Middleware (JWT Verification)
        |
        ↓
Controllers (Business Logic)
        |
        ↓
Prisma ORM
        |
        ↓
PostgreSQL Database
```

---

## 🔄 Application Flow

### 1️⃣ User Registration

```
POST /api/auth/register
```

* Validates input using Zod
* Hashes password using bcrypt
* Stores user in database

---

### 2️⃣ User Login

```
POST /api/auth/login
```

* Verifies credentials
* Generates JWT token
* Returns token to client

---

### 3️⃣ Authenticated Task Operations

All task routes require:

```
Authorization: Bearer <JWT_TOKEN>
```

| Method | Endpoint       | Description    |
| ------ | -------------- | -------------- |
| POST   | /api/tasks     | Create task    |
| GET    | /api/tasks     | Get user tasks |
| PUT    | /api/tasks/:id | Update task    |
| DELETE | /api/tasks/:id | Delete task    |

---

## 🔐 Authentication Middleware Logic

* Extracts token from request header
* Verifies JWT token
* Attaches `userId` to request
* Blocks unauthorized access

---

## 🧪 API Testing

All APIs were tested using **Postman**:

* Authentication APIs
* Protected task APIs
* Token validation
* User-specific data isolation

---

## 🛠 Local Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone <your-repo-url>
cd task-manager-app
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
JWT_SECRET=your_secret_key
```

Run migrations:

```bash
npx prisma migrate dev
```

Start server:

```bash
npm run dev
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🧠 Key Learnings

* JWT authentication and authorization
* Middleware-based route protection
* Prisma ORM with relational data
* Clean backend architecture
* Secure password handling
* Full CRUD lifecycle

---

## 👨‍💻 Author

**Prathmesh Kulkarni**
