# 🌟 Banking Website 🌟

## 📌 Overview
Welcome to the **Banking Website**, a modern, secure, and user-friendly platform for managing bank accounts and transactions. Built with a **React + Vue** frontend, an **Express.js** backend, and **MySQL** as the database, this application ensures smooth banking operations with enhanced security.

## ✨ Features
✅ **Secure User Authentication** – Sign up, log in, and manage accounts with strong authentication.
✅ **Account Management** – View balances, transaction history, and account details.
✅ **Fund Transfers** – Transfer money securely with validation mechanisms.
✅ **🚫 Transaction Cool-Down** – Prevents duplicate payments to the same account with the same amount within **5 minutes**.
✅ **Responsive UI** – Built with React and Vue for a dynamic and engaging user experience.
✅ **High Performance** – Express.js backend for fast and efficient processing.
✅ **Data Integrity** – MySQL ensures reliability and structured data handling.
✅ **Robust Logging & Error Handling** – Seamless monitoring and debugging.

## 🛠️ Tech Stack
🖥 **Frontend**: React.js + Vue.js  
🖧 **Backend**: Express.js (Node.js)  
💾 **Database**: MySQL  
🔐 **Authentication**: JWT-based authentication  

## 🚀 Installation & Setup
### ⚡ Prerequisites
Make sure you have the following installed:
- 🟢 **Node.js** (latest LTS version)
- 🛢 **MySQL Server**
- 📦 **npm or yarn package manager**

### 📂 Clone the Repository
```sh
 git clone https://github.com/Naman-ghost/banking_full_stack.git
```

### 🏗 Backend Setup
1️⃣ Navigate to the backend directory:
   ```sh
   cd banking_full_stack/backend
   ```
2️⃣ Install dependencies:
   ```sh
   npm install
   ```
3️⃣ Configure environment variables:
   - Create a `.env` file and set up the database credentials and JWT secret.
   ```sh
   DB_HOST=your_db_host
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_NAME=banking_db
   JWT_SECRET=your_secret_key
   ```
4️⃣ Run database migrations:
   ```sh
   npm run migrate
   ```
5️⃣ Start the backend server:
   ```sh
   npm start
   ```

### 🎨 Frontend Setup
1️⃣ Navigate to the frontend directory:
   ```sh
   cd ../frontend
   ```
2️⃣ Install dependencies:
   ```sh
   npm install
   ```
3️⃣ Start the frontend:
   ```sh
   npm run dev
   ```

## 📖 Usage
🔹 **Register/Login** to access banking features.  
🔹 **View account details & transaction history.**  
🔹 **Transfer funds with cooldown restrictions applied.**  
🔹 **Ensure transactions comply with the 5-minute cooldown rule.**  

## 📡 API Endpoints
### 🔑 Authentication
🔹 `POST /api/auth/register` – Register a new user  
🔹 `POST /api/auth/login` – Login user and return JWT token  

### 💰 Transactions
🔹 `POST /api/transfer` – Transfer funds (**5-minute cooldown applied**)  
🔹 `GET /api/transactions` – Fetch user transaction history  

## 📝 License
This project is licensed under the **MIT License**.

## 🤝 Contributors
👨‍💻 **Naman Singh** - Full Stack Developer

## 📬 Contact
For issues or feature requests, please **open an issue on GitHub** or contact **singhnama64@gmail.com**. 🚀

