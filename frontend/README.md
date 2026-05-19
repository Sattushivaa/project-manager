# Frontend

Frontend for the Project Manager app built using React and Vite.

## Features

- Login and signup pages
- Projects dashboard
- Create and manage tasks
- Task search and filtering
- Protected frontend routes

## Tech Stack

- React
- Vite
- React Router
- Fetch API

## Setup

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

## Pages

```bash
/login
/
/projects/create
/projects/:projectId
```

## Notes

- Frontend sends requests using `credentials: "include"`
- Backend should be running on port 5000
- Vite proxy is used for API requests