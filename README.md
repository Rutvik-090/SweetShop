# 🍬 Sweet Shop Management System

A full-stack inventory management system for sweet shops, built using the **MERN stack (MongoDB, Express, React, Node.js)**. It allows users to **add, view, purchase, restock, and delete sweets**, and includes **fully tested backend and frontend logic**.

---

## 📦 Project Setup

## 📦 Prerequisites

Make sure you have the following tools installed **before** setting up the project:

| Tool            | Minimum Version | Installation Guide                     |
|-----------------|-----------------|----------------------------------------|
| [Node.js](https://nodejs.org/)     | 16.x or higher  | https://nodejs.org/en/download/          |
| [npm](https://www.npmjs.com/)      | 8.x or higher   | Comes with Node.js                      |
| [MongoDB](https://www.mongodb.com/atlas/database) | Any version (Atlas or Local) | https://www.mongodb.com/try/download/community |
| [Git](https://git-scm.com/)        | Latest          | https://git-scm.com/downloads            |

### ✅ Optional (For Dev Efficiency)

| Tool              | Purpose                        |
|-------------------|--------------------------------|
| [Nodemon](https://www.npmjs.com/package/nodemon) | Auto-restart server on file change |
| [Vite](https://vitejs.dev/)                      | Fast frontend development (used in this project) |
| [Postman](https://www.postman.com/)              | API testing tool (optional but recommended) |

 1. Clone the Project
  git clone https://github.com/your-username/sweet-shop.git
  cd sweet-shop

 2. Setup the Backend
  cd backend

  # Install dependencies
    npm install

  # Create .env file
    echo "PORT=5000
    MONGO_URI=your_mongodb_uri_here" > .env

  # Run backend
    npm run dev

 3. Setup the Frontend
  cd ../frontend

  # Install dependencies
    npm install

  # Create .env file
    echo "VITE_BACKEND_URL=http://localhost:5000" > .env

  # Run frontend
    npm run dev

## URLs to Visit
  Frontend: http://localhost:5173

  Backend: http://localhost:5000/sweets/view (API test)

  


## 🧪 Test Report

## ✅ Backend Tests (Jest + Supertest)
    cd backend
    npm test

## Sample output:
PASS  tests/sweetRoutes.test.js
✓ should add a sweet (40ms)
✓ should return all sweets (20ms)
✓ should purchase a sweet (22ms)
✓ should restock a sweet (18ms)
✓ should delete a sweet (17ms)

Test Suites: 1 passed, 1 total
Tests:       5 passed, 5 total

## ✅ Frontend Tests (React Testing Library)
## Run:
    cd frontend
    npm test

## Sample output:   
PASS  __tests__/Add.test.jsx
✓ renders all form fields (30ms)
✓ submits form with valid data (50ms)

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total



## 🚀 Features

- 🔄 **Add Sweets** with name, category, price, and quantity  
- 📋 **View Sweets** in a searchable and sortable list  
- 🛒 **Purchase** sweets with auto-reduced inventory  
- 📦 **Restock** sweets to update available stock  
- ❌ **Delete** discontinued sweets  
- 🧪 **Fully tested** backend and frontend with Jest & RTL

---

## 🛠 Tech Stack

| Layer        | Technology                                |
|--------------|--------------------------------------------|
| **Frontend** | React, Tailwind CSS                        |
| **Backend**  | Express.js, Node.js                        |
| **Database** | MongoDB with Mongoose ORM                  |
| **API Client** | Axios                                   |
| **Testing**  | Jest, Supertest, React Testing Library     |
| **Dev Tools**| Vite / CRA, Nodemon, ESLint                |

---



## 📸 Preview

<img width="1919" height="984" alt="Screenshot 2025-07-16 223946" src="https://github.com/user-attachments/assets/002fac78-9987-4f94-b52d-a3fcbdcc170c" />
<img width="1919" height="983" alt="Screenshot 2025-07-16 224007" src="https://github.com/user-attachments/assets/284ef228-7126-4fab-bd2a-0b80532b82db" />
<img width="1918" height="985" alt="Screenshot 2025-07-16 230133" src="https://github.com/user-attachments/assets/42359917-fc73-4f0a-a739-a8e5b2c7da85" />
<img width="1919" height="986" alt="Screenshot 2025-07-16 224041" src="https://github.com/user-attachments/assets/c6d5fff4-b134-4afe-9cf0-77e669127a38" />
<img width="1919" height="983" alt="Screenshot 2025-07-16 224111" src="https://github.com/user-attachments/assets/b51066f5-2904-425d-9b3d-a7600e412692" />



