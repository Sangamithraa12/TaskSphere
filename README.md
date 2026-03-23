# 🚀 TaskSphere

A modern full-stack **Task Management Web Application** built using a scalable monorepo architecture. TaskSphere enables users to securely manage their daily tasks with authentication, priority levels, and due dates.

---

## 🌐 Project Overview

TaskSphere is a productivity platform where users can:

- 🔐 Register and log in securely  
- 📝 Create, update, and delete tasks  
- 🏷️ Organize tasks with priority and deadlines  
- 👤 Manage tasks privately (user-specific data)  

---

## 🏗️ Project Architecture
TaskSphere/
├── FRONTEND/ tasksphere-frontend → Angular 21 SPA
└── BACKEND/ TaskSphere.API → ASP.NET Core Web API (.NET 10)


- Monorepo architecture  
- Clear separation of frontend and backend  
- Scalable and maintainable structure  

---

## 🖥️ Frontend

- **Framework:** Angular v21  
- **Language:** TypeScript 5.9  
- **UI Library:** Angular Material 21  
- **Testing:** Vitest  
- **Code Style:** Prettier  

### 📄 Pages & Features

- 🔐 Login – User authentication  
- 📝 Register – New user signup  
- 📋 Task List – View and manage tasks  
- ✏️ Task Form – Create/Edit tasks  
- 🛡️ Route Guards for protected routes  
- 🔑 JWT Auth Interceptor for secure API calls  

---

## ⚙️ Backend

- **Framework:** ASP.NET Core Web API  
- **Target:** .NET 10  
- **ORM:** Entity Framework Core (SQL Server)  
- **Authentication:** JWT Bearer  
- **Password Hashing:** BCrypt.Net  
- **API Docs:** Swagger (Swashbuckle)  

### 🔧 Key Components

**Controllers**
- AuthController  
- TasksController  

**Models**
- User  
- TaskItem  
  - Title  
  - Description  
  - Status  
  - Priority  
  - DueDate  
  - UserId  

**Services**
- AuthService  
- TaskService  

**Architecture**
- DTOs  
- Helpers  
- Database Migrations  
- Clean layered architecture  

---

## ✨ Core Features

- 🔐 User Authentication (Register & Login with JWT)  
- ✅ Task Management (Create, Read, Update, Delete)  
- 🏷️ Task Attributes (Title, Description, Status, Priority, Due Date)  
- 👤 User-specific task management  
- 🛡️ Protected routes with authentication  

---

## 🧰 Tech Stack

| Layer      | Technology                      |
|------------|--------------------------------|
| Frontend   | Angular 21 + Angular Material  |
| Backend    | ASP.NET Core (.NET 10)         |
| Database   | SQL Server (EF Core)           |
| Auth       | JWT + BCrypt                   |
| API Docs   | Swagger UI                     |

---


