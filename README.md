# MERN-Todo-Project
A Todo App Built Using MERN Stack

Frontend Access: http://localhost:3000/
Backend Access: http://localhost:5000/

📝 Task Manager App (MERN Stack)
A full-stack task management application built with MongoDB, Express, React, and Node.js. It includes secure JWT-based authentication and only shows tasks specific to the logged-in user.

🚀 Features
🔐 User authentication with JWT

🧾 Signup with confirm password validation

✅ Create, Read, Update, Delete tasks

👤 Tasks are user-specific (not shared across accounts)

💻 React frontend styled with plain CSS

🧼 Clean, minimal UI

🏗️ Tech Stack
Frontend: React, React Router

Backend: Node.js, Express.js

Database: MongoDB (via Mongoose)

Auth: JSON Web Token (JWT), bcrypt

📁 Folder Structure
/client        - React frontend
/server        - Node.js + Express backend
🔧 Installation Instructions
1. Clone the Repository
git clone https://github.com/nsairevanth21/MERN-Todo-Project.git todo-mern-app
cd MERN-Todo-Project
2. Setup Backend
cd server
npm install
Create a .env file in the /server directory:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
Start the backend server:
npm start
3. Setup Frontend
Open a new terminal:
cd client
npm install
npm start
🔐 Authentication Flow
On signup, password is hashed and saved in MongoDB.

On login, a JWT token is generated using the user's email.

Protected routes (like /dashboard and /tasks) require a valid token.

Tasks are always tied to the authenticated user's _id.

✅ API Routes Summary
Auth (/api/auth)
POST /signup – Register a user
POST /login – Authenticate and return JWT token

Tasks (/api/tasks)
GET / – Get all tasks of logged-in user

POST / – Create task

PUT /:id – Update specific task

DELETE /:id – Delete task

📸 Screenshots \n
Login \n
<img width="333" height="212" alt="image" src="https://github.com/user-attachments/assets/0a076cdc-c652-4f8f-97cd-2063aa4c5552" />
Signup
<img width="331" height="316" alt="image" src="https://github.com/user-attachments/assets/d4e2a48d-60db-4908-9719-36fc76820d9f" />
Dashboard
<img width="937" height="449" alt="image" src="https://github.com/user-attachments/assets/0d232b5f-4d6c-493f-a1de-2d38af74135a" />

🛡️ Security Notes
JWT secret is stored in .env

Passwords are hashed using bcrypt

Tasks filtered by userId in every query

🧑‍💻 Author
Built by Your Sai Revanth Nandam — feel free to fork or contribute!
