# Full-Stack Inventory Management App

This is a MERN stack (MongoDB, Express, React, Node.js) application for managing a personal inventory.

## Features

- User Registration and Login (JWT Authentication)
- Full CRUD (Create, Read, Update, Delete) operations for inventory items
- Users can only view and manage their own items
- Protected routes on both frontend and backend

## Setup

1.  **Backend**
    - `cd backend`
    - `npm install`
    - Create a `.env` file and add your `MONGO_URI` and `JWT_SECRET`.
    - `npm run dev` (to start the server with nodemon)

2.  **Frontend**
    - `cd frontend`
    - `npm install`
    - `npm run dev` (to start the Vite dev server)

3.  Access the app at `http://localhost:5173`.
