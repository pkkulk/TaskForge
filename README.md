# 📝 Task Management Application (Full Stack)

A full-stack **Task Management Application** with **JWT-based authentication**, allowing users to securely **register, log in, and manage their own tasks**.

The application follows a clean **frontend–backend separation**, uses **middleware-based authorization**, and ensures **user-level data isolation**.

---

## 📸 Screenshots

<p align="center">
  <img width="80%" src="https://github.com/user-attachments/assets/e9b99055-223a-4fb9-a7ca-bab573eb2a42" />
</p>

<p align="center">
  <img width="45%" src="https://github.com/user-attachments/assets/fa0f3d48-3a77-4956-9fab-38118a21f8e2" />
   <img width="45%" src="https://github.com/user-attachments/assets/927c0d75-4fbc-4ee6-b7e8-2bf306f6adaa" />
</p>

---

## 🚀 Features

### 🔐 Authentication

* User registration with **hashed passwords**
* User login with **JWT token generation**
* Secure authentication using **JSON Web Tokens**
* Protected routes using **authentication middleware**

### ✅ Task Management

* Create tasks
* View user-specific tasks
* Update task status
* Delete tasks
* Each task belongs to a **single authenticated user**

### 🛡 Security

* Password hashing with **bcrypt**
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
* Zod (Request Validation)

### Frontend

* React 18 (Vite)
* Tailwind CSS
* Axios
* React Router
* JWT-based route protection

---

## 📁 Project Structure

```
task-manager-app/
│
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   │
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── auth.controller.ts
│   │   │   └── task.controller.ts
│   │   │
│   │   ├── routes/
│   │   │   ├── auth.routes.ts
│   │   │   └── task.routes.ts
│   │   │
│   │   ├── middlewares/
│   │   │   └── auth.middleware.ts
│   │   │
│   │   ├── validators/
│   │   │   ├── auth.schema.ts
│   │   │   └── task.schema.ts
│   │   │
│   │   ├── utils/
│   │   │   ├── hash.ts
│   │   │   ├── jwt.ts
│   │   │   └── prisma.ts
│   │   │
│   │   ├── app.ts
│   │   └── server.ts
│   │
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   ├── axios.ts
│   │   │   ├── auth.ts
│   │   │   └── tasks.ts
│   │   │
│   │   ├── pages/
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   └── Dashboard.tsx
│   │   │
│   │   ├── routes/
│   │   │   └── ProtectedRoute.tsx
│   │   │
│   │   ├── App.tsx
│   │   └── main.tsx
│   │
│   └── index.css
│
└── README.md
```

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

Backend runs on:

```
http://localhost:5000
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## 🧠 High-Level Architecture

```
Frontend (React)
        |
        | HTTP Requests (Axios + JWT)
        ↓
Backend Routes (Express)
        |
        ↓
Authentication Middleware
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

## 🔁 End-to-End Sequence Flow

### 1️⃣ User Registration

```
User
 → Frontend (Register Page)
 → POST /api/auth/register
 → Validation (Zod)
 → Password Hashing (bcrypt)
 → Prisma ORM
 → PostgreSQL
 → User Created
 → Redirect to Login
```

---

### 2️⃣ User Login (JWT Generation)

```
User
 → Frontend (Login Page)
 → POST /api/auth/login
 → Credential Verification
 → JWT Generated
 → Token returned
 → Stored in localStorage
 → Redirect to Dashboard
```

---

### 3️⃣ Fetch Tasks (Protected)

```
Frontend
 → GET /api/tasks
 → Authorization: Bearer <JWT>
 → Auth Middleware
 → userId extracted
 → Task Controller
 → Prisma ORM
 → PostgreSQL
 → Tasks returned
 → Rendered on Dashboard
```

---

### 4️⃣ Create / Update / Delete Task

```
User Action
 → Frontend
 → Protected API Call
 → Auth Middleware
 → Task Controller
 → Prisma ORM
 → PostgreSQL
 → Success Response
 → UI Refresh
```

---

# 🗂 How Files Interact (Frontend ↔ Backend Mapping)

This section explains **which exact files are involved** for each user action, from UI to database.

---

## 1️⃣ User Registration

### 🖥 Frontend

* **UI Page:**
  `frontend/src/pages/Register.tsx`
* **API Call:**
  `frontend/src/api/auth.ts`

  ```ts
  registerUser({ username, password })
  ```

### 🔧 Backend

* **Route:**
  `backend/src/routes/auth.routes.ts`
* **Controller:**
  `backend/src/controllers/auth.controller.ts`

  * Validates request using Zod
  * Hashes password
* **Utility:**
  `backend/src/utils/hash.ts`
* **Database Access:**
  `backend/src/utils/prisma.ts`

### 🗄 Database

* **Table:** `User`

---

## 2️⃣ User Login

### 🖥 Frontend

* **UI Page:**
  `frontend/src/pages/Login.tsx`
* **API Call:**
  `frontend/src/api/auth.ts`

  ```ts
  loginUser({ username, password })
  ```
* **Token Storage:**
  `localStorage`

### 🔧 Backend

* **Route:**
  `backend/src/routes/auth.routes.ts`
* **Controller:**
  `backend/src/controllers/auth.controller.ts`

  * Compares password
  * Generates JWT
* **Utility:**
  `backend/src/utils/jwt.ts`

### 🗄 Database

* **Table:** `User`

---

## 3️⃣ Open Dashboard (View Tasks)

### 🖥 Frontend

* **UI Page:**
  `frontend/src/pages/Dashboard.tsx`
* **Protected Route:**
  `frontend/src/routes/ProtectedRoute.tsx`
* **API Call:**
  `frontend/src/api/tasks.ts`

  ```ts
  getTasks()
  ```

### 🔧 Backend

* **Route:**
  `backend/src/routes/task.routes.ts`
* **Middleware:**
  `backend/src/middlewares/auth.middleware.ts`

  * Verifies JWT
  * Extracts `userId`
* **Controller:**
  `backend/src/controllers/task.controller.ts`

### 🗄 Database

* **Table:** `Task` (filtered by `userId`)

---

## 4️⃣ Create Task

### 🖥 Frontend

* **UI Page:**
  `frontend/src/pages/Dashboard.tsx`
* **API Call:**
  `frontend/src/api/tasks.ts`

  ```ts
  createTask({ title, description, status })
  ```

### 🔧 Backend

* **Route:**
  `backend/src/routes/task.routes.ts`
* **Middleware:**
  `auth.middleware.ts`
* **Controller:**
  `task.controller.ts`

  * Attaches task to logged-in user

### 🗄 Database

* **Table:** `Task`

---

## 5️⃣ Update Task Status

### 🖥 Frontend

* **UI Page:**
  `Dashboard.tsx`
* **API Call:**

  ```ts
  updateTask(taskId, { status })
  ```

### 🔧 Backend

* **Route:**
  `PUT /api/tasks/:id`
* **Middleware:**
  `auth.middleware.ts`
* **Controller:**
  `task.controller.ts`

  * Verifies task ownership

### 🗄 Database

* **Table:** `Task`

---

## 6️⃣ Delete Task

### 🖥 Frontend

* **UI Page:**
  `Dashboard.tsx`
* **API Call:**

  ```ts
  deleteTask(taskId)
  ```

### 🔧 Backend

* **Route:**
  `DELETE /api/tasks/:id`
* **Middleware:**
  `auth.middleware.ts`
* **Controller:**
  `task.controller.ts`

### 🗄 Database

* **Table:** `Task`

---

## 7️⃣ Logout

### 🖥 Frontend

* **UI Page:**
  `Dashboard.tsx`
* **Logic:**

  ```ts
  localStorage.removeItem("token")
  ```
* **Redirect:**
  `/login`

### 🔧 Backend

* ❌ No backend call (JWT is stateless)

---

## 🔑 Axios Token Handling (Important)

### Frontend File

* `frontend/src/api/axios.ts`

This file:

* Sets backend base URL
* Automatically attaches JWT token to every request

```ts
Authorization: Bearer <token>
```

---

## 🔌 API Endpoints

### Authentication

| Method | Endpoint           | Description   |
| ------ | ------------------ | ------------- |
| POST   | /api/auth/register | Register user |
| POST   | /api/auth/login    | Login user    |

### Tasks (Protected)

| Method | Endpoint       | Description    |
| ------ | -------------- | -------------- |
| GET    | /api/tasks     | Get user tasks |
| POST   | /api/tasks     | Create task    |
| PUT    | /api/tasks/:id | Update task    |
| DELETE | /api/tasks/:id | Delete task    |

---

## 🧠 Key Learnings

* JWT authentication & authorization
* Middleware-based route protection
* Prisma ORM with relational data
* Secure password handling
* Clean frontend–backend integration
* End-to-end full-stack workflow

---

## 👨‍💻 Author

**Prathmesh Kulkarni**

---
