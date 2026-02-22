# 🚀 Multi-Tenant Blogging Platform API

## 📖 Project Overview
This project is a high-performance Backend REST API designed for a multi-tenant blogging ecosystem. It allows multiple organizations (tenants) to coexist on the same infrastructure while ensuring strict **data isolation**. 

Key architectural highlights include:
* **Tenant-Specific Isolation:** Users and posts are logically partitioned; a user in "Tenant A" cannot access data from "Tenant B."
* **Role-Based Access Control (RBAC):** Granular permissions for `ADMIN` and `MEMBER` roles.
* **Scalable Architecture:** Built with TypeScript and Prisma for type-safety and easy database management.

---

## 🛠️ Tech Stack
* **Runtime:** Node.js
* **Framework:** Express.js
* **Language:** TypeScript
* **Database:** PostgreSQL
* **ORM:** Prisma
* **Authentication:** JWT (JSON Web Tokens)
* **Security:** Bcrypt (Password Hashing)

---

## ⚙️ Setup Instructions

Follow these steps to get the development environment running locally:

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd multi-tenant-blog-api
```
### 2. Install Dependencies
```bash
npm install
```
### 3. Environment Configuration
Create a .env file in the root directory and populate it with your credentials:
```bash 
PORT=4000
DATABASE_URL="postgresql://username:password@localhost:5432/multitenant_blog"
JWT_SECRET="your_secret_key_here"
```
### 4. Database Setup
Initialize the database schema using Prisma:

```Bash
npx prisma migrate dev --name init
npx prisma generate
```
### 5. Start the Server
```Bash
npm run dev
```
The API will be accessible at: 
**http://localhost:4000**

---
## 📑 API Endpoints Documentation
### 🏢 Tenant Management
```bash
POST /tenants
```
### 🔐 Authentication
```bash
POST /auth/register  
POST /auth/login  
```
### 📝 Posts (Protected)
**All post routes require JWT token in header:**
```bash
Authorization: Bearer <JWT_TOKEN>
```
**Post Routes:**
```bash
POST   /posts  
GET    /posts?page=1&limit=10&title=hello  
PUT    /posts/:id  
DELETE /posts/:id  
```
### 🧠 Roles & Permissions (RBAC)
**ADMIN:**
- Can create posts  
- Can edit any post  
- Can delete any post  

**MEMBER:**
- Can create posts  
- Can edit only their own posts 
---
## Pagination and Filtering
```bash
GET /posts?page=1&limit=5
GET /posts?title=node&page=1&limit=5
```
## Database Indexing

**Indexes are added on:**

● tenantId

● authorId

● createdAt

● deletedAt

This helps with performance when fetching posts.

## Testing

**A Postman collection is included in the repo:**
```bash
/postman/blog-api.postman_collection.json
```

You can import this into Postman to test all endpoints.

---
## Notes

● .env is not committed to GitHub

● .env.example is provided

● All routes that modify or read posts are protected by JWT

● Tenant ID is always enforced in database queries
