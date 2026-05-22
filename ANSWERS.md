## 1. How to run

To run this project on a fresh machine:

### Requirements
- Node.js installed
- MongoDB Atlas connection
- `.env` file setup in backend

### Backend
cd backend  
npm install  
node server.js  

### Frontend
cd frontend  
npm install  
npm run dev  

---

## 2. Stack choice

I chose the MERN stack (MongoDB, Express, React, Node.js) because it is simple, fast, and widely used for full-stack web applications.
React makes it easy to build a dynamic user interface where tasks update instantly when their status changes. Node.js and Express are good for building lightweight APIs that handle authentication and task operations. MongoDB works well for this project because it stores flexible data and keeps everything persistent even after restarting the app.
A worse choice for this project would have been using plain PHP with file-based storage. That would make the system harder to scale, slower to manage, and unreliable for handling multiple users or real-time updates.

---

## 3. One real edge case

One important edge case I handled is ensuring that the dashboard does not load or make API calls when the user is not authenticated.
File: `frontend/src/App.jsx` (lines 39–53)
A `useEffect` hook is used to fetch tasks from the backend only when both `user` and `token` exist. If either is missing, the request is skipped.
Without this check, the app could try to call protected APIs without authentication, which would result in errors or broken UI state.

---

## 4. AI usage
I used AI (ChatGPT) in the following parts of this project:
- To debug React state management issues
- To improve error handling messages in both frontend and backend
I modified some AI suggestions because they were initially more complex than needed. I simplified the structure to keep the project easy to understand, maintain, and suitable for an assessment-level submission.
---

## 5. Honest gap
One limitation in my project is the lack of loading states and optimistic UI updates.
Currently, when tasks are created or updated, the UI waits for the server response, which can cause a slight delay on slower networks.
If I had more time, I would add loading indicators and optimistic updates to make the app feel faster and more responsive.