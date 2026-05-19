# Project Manager

A simple full-stack project management web app made using React, Express, and MongoDB.

Users can create projects and manage tasks inside them after logging in.

## Tech Stack

Frontend:
- React
- Vite

Backend:
- Node.js
- Express.js
- MongoDB
- JWT Authentication

## Features

- User signup and login
- Authentication using JWT cookies
- Create, edit, and delete projects
- Create, edit, and delete tasks
- Task status management (`todo`, `in-progress`, `done`)
- Search and filter tasks
- Separate projects for each logged-in user

## Folder Structure

```bash
backend/
frontend/
```

- `backend` contains the Express server and MongoDB models
- `frontend` contains the React app

---

# Setup

## Backend

```bash
cd backend
npm install
```

Create a `.env` file inside backend:

```env
MONGO_URI=mongodb://localhost:27017/
JWT_SECRET=your_secret_here
PORT=5000
```

Run backend:

```bash
node index.js
```

---

## Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# Main API Routes

## Auth

```bash
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
```

## Projects

```bash
GET /api/projects
POST /api/projects
PUT /api/projects/:id
DELETE /api/projects/:id
```

## Tasks

```bash
POST /api/projects/:id/tasks
PUT /api/tasks/:id
DELETE /api/tasks/:id
```

---

# Notes

- JWT token is stored in HTTP-only cookies
- Frontend uses `credentials: "include"` for authentication
- MongoDB should be running before starting backend

---