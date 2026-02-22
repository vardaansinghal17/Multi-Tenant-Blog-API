# Multi-Tenant Blogging Platform API

## Project Overview

This project is a backend REST API for a multi-tenant blogging platform.  
Multiple organizations (tenants) can use the same application, but each tenant has its own users and posts.  
Data is strictly isolated between tenants.

Users can register and login under a specific tenant.  
Role-based access control (RBAC) is implemented with two roles:

- ADMIN  
- MEMBER  

Both roles can create posts.  
Members can edit only their own posts.  
Admins can edit or delete any post within their tenant.

---

## Tech Stack

- Backend: Node.js, Express, TypeScript  
- Database: PostgreSQL  
- ORM: Prisma  
- Authentication: JWT  
- Password Hashing: bcrypt  

---

## Setup Instructions

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd multi-tenant-blog-api
2. Install dependencies
npm install
3. Create environment file

Create a .env file in the root directory:

PORT=4000
DATABASE_URL=postgresql://username:password@localhost:5432/multitenant_blog
JWT_SECRET=your_secret_key
4. Setup database
npx prisma migrate dev
npx prisma generate
5. Start the server
npm run dev

Server will run at:

http://localhost:4000
API Endpoints
Tenant

Create a new tenant:

POST /tenants

Request Body:

{
  "name": "Acme Corp"
}
Authentication

Register a user under a tenant:

POST /auth/register

Request Body:

{
  "email": "admin@acme.com",
  "password": "123456",
  "tenantId": "TENANT_ID",
  "role": "ADMIN"
}

Login and get JWT token:

POST /auth/login

Request Body:

{
  "email": "admin@acme.com",
  "password": "123456",
  "tenantId": "TENANT_ID"
}
Posts (Protected Routes)

All post routes require JWT token in header:

Authorization: Bearer <JWT_TOKEN>

Create a post:

POST /posts

Request Body:

{
  "title": "My first post",
  "content": "Hello world"
}

Get all posts (with pagination & filtering):

GET /posts?page=1&limit=10&title=hello

Update a post:

PUT /posts/:id

Request Body:

{
  "title": "Updated title",
  "content": "Updated content"
}

Delete a post (Admin only):

DELETE /posts/:id
Notes

Email is unique within a tenant.

JWT token is required for protected routes.

Data is isolated per tenant.

Soft delete is used for posts.

Pagination and filtering are supported on post listing.