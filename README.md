# TaskFlow Pro — Persistent Mini Task App

## Working Code
This is a full-stack web application built using React (Vite) for the frontend, Node.js with Express for the backend, and MongoDB Atlas for persistent storage. It is a task management system where users can register, log in, and manage their tasks with full CRUD operations including create, update, soft delete, restore, and status tracking.

## Features
- User Signup & Login (JWT Authentication)
- Create, update, delete, and restore tasks
- Task status workflow: Pending → In Progress → Done
- Soft delete with Trash system
- Filter tasks (All, Active, Done, Trash, Focus)
- Progress tracking dashboard
- Persistent data storage using MongoDB Atlas

## How to Run

### Backend
cd backend
npm install
node server.js

### Frontend
cd frontend
npm install
npm run dev

## Requirements
- Node.js installed
- MongoDB Atlas connection string configured in .env file 
- JWT_SECRET defined in .env file

## Note
All data is persistent and will remain saved even after restarting the application.