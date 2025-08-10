# 🥗 Recipoo – Your Smart Recipe Finder
(One of my first projects i built as a practice)
**Recipoo** is a full-stack web application that makes finding, managing, and creating recipes easier than ever. With a **React** frontend and **Express.js** backend, Recipoo delivers a fast, responsive, and enjoyable cooking experience for users.

---

## 📌 Features
- **Recipe Search** – Search from a vast collection of recipes with detailed instructions and ingredient lists.  
- **Custom Recipe Creation** – Add your own recipes, including images, descriptions, and cooking steps.  
- **User Accounts & Authentication** – Sign up, log in, and save your favorite recipes for easy access.  
- **Responsive Design** – Works seamlessly on desktop, tablet, and mobile devices.  
- **Backend API** – Secure and scalable Express.js API to handle recipe storage and user authentication.  

---

## 🛠️ Tech Stack
**Frontend:** React.js, React Router, Axios, Tailwind CSS  
**Backend:** Node.js with Express.js, MongoDB with Mongoose ORM, JWT Authentication, Multer for image uploads  

---

## 🚀 Getting Started

To run Recipoo locally:

```bash
# 1️⃣ Clone the repository
git clone https://github.com/<your-username>/recipoo.git
cd recipoo

# 2️⃣ Install all dependencies
cd backend && npm install
cd ../frontend && npm install
cd ..

# 3️⃣ Create environment variables file
cd backend
echo "MONGO_URI=your_mongodb_connection_string" > .env
echo "JWT_SECRET=your_secret_key" >> .env
echo "PORT=5000" >> .env
cd ..

# 4️⃣ Start both backend and frontend
cd backend && npm run dev &
cd ../frontend && npm start

```

# 📸 Screenshots

### Home Page
![Recipoo Home Page](SC/Screenshot%202025-08-10%20161221.png)
![Recipoo Home Page](SC/Screenshot%202025-08-10%20161314.png)


### Recipe View
![Recipe View](SC/Screenshot%202025-08-10%20161419.png)

