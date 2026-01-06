# 💬 **_Chat App_**

A **real-time chat application** built with **React (Vite)** frontend and **Node.js + Express + MongoDB** backend.  
Supports **text, images, typing alerts, notifications, and online/offline status** with a **responsive UI**.

---

## 🚀 **Features**

- 📝 **Signup & Login** with JWT authentication  
- 🔒 **Protected routes**  
- 🌐 **Online / Offline user status**  
- 💌 **Send messages**: text, image, or both (single image per message)  
- ⌨️ **Typing indicator**  
- 🔔 **Notifications** when a user connects or logs in  
- 🔍 **Search users**  
- 🕒 **Message timestamp**  
- 🖥️ **Responsive UI** with **Tailwind CSS + DaisyUI**  

> ⚠️ **Note:** Message status (sent, delivered, read) is **not implemented**.

---

## 🗂️ **Project Structure**

chat-app/
├─ README.md # Project overview
├─ backend/ # Node.js + Express backend
│ ├─ .gitignore
│ ├─ package.json
│ ├─ package-lock.json
│ └─ .env.example
└─ frontend/ # React (Vite) frontend
├─ .gitignore
├─ package.json
├─ package-lock.json
├─ vite.config.js
├─ eslint.config.js
├─ public/
└─ src/

---

## ⚡ **Getting Started**

### ⚙ Setup

- ### create a `.env` file in the `backend` folder taking example from `.example.env`

```
PORT=8000
SECRET_KEY=
MONGODB_URI
....
```

### 🏃‍♂️ Running in local development mode

- `backend`

```bash
cd backend
npm install
npm run dev
```

- `frontend`

```bash
cd frontend
npm install
npm run dev
```

🛠️ Tech Stack
Frontend: React, Vite, Tailwind CSS, DaisyUI, Redux

Backend: Node.js, Express, MongoDB, Mongoose, JWT

Realtime: Socket.io

Authentication: JWT tokens

Image Storage: Cloudinary (or any cloud storage)

🎨 UI / UX
Mobile and desktop responsive

Online users displayed first, offline users next

Clean message display with timestamp

Typing alert shows when other user is typing

💡 Notes
Single image per message supported

No message status tracking implemented

Use .env.example to configure environment variables

Root README.md is the main documentation — frontend Vite README is ignored

📦 Git & Deployment Tips
Commit package-lock.json for consistent dependency versions

.env files are ignored; never commit secrets

.gitignore includes node_modules/, build folders, and local configs

✨ Enjoy chatting in real-time!