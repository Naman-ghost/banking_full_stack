# Banking Website

## Overview
This is a full-stack banking website that allows users to manage their accounts, transfer funds, and perform other financial transactions securely. The application features a **React + Vue** frontend, an **Express.js** backend, and a **MySQL** database.

## Features
- **Secure User Authentication**: Users can sign up, log in, and manage their accounts securely.
- **Account Management**: View account details, transaction history, and balance.
- **Fund Transfers**: Transfer money between accounts with validation rules.
- **Transaction Cool-Down**: Multiple payments to the same account with the same amount cannot be made within a **5-minute cooldown period**.
- **Responsive UI**: Built with React and Vue for a seamless and dynamic user experience.
- **Fast and Scalable**: Utilizes Express.js for the backend, ensuring efficient API handling.
- **Data Persistence**: MySQL database ensures reliability and integrity of financial data.
- **Error Handling and Logging**: Comprehensive error handling and logging mechanisms.

## Tech Stack
- **Frontend**: React.js + Vue.js
- **Backend**: Express.js (Node.js)
- **Database**: MySQL
- **Authentication**: JWT-based authentication

## Installation & Setup
### Prerequisites
Ensure you have the following installed:
- Node.js (latest LTS version)
- MySQL Server
- npm or yarn package manager

### Clone Repository
Clone the repository using the following command:
```sh
 git clone https://github.com/Naman-ghost/banking_full_stack.git
```

### Backend Setup
1. Navigate to the backend directory:
   ```sh
   cd banking_full_stack/backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure environment variables:
   - Create a `.env` file and set up the database credentials and JWT secret.
   ```sh
   DB_HOST=your_db_host
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_NAME=banking_db
   JWT_SECRET=your_secret_key
   ```
4. Run database migrations:
   ```sh
   npm run migrate
   ```
5. Start the backend server:
   ```sh
   npm start
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```sh
   cd ../frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend:
   ```sh
   npm run dev
   ```

## Usage
- Register/Login to access banking features.
- View account details and transaction history.
- Transfer funds with cooldown restrictions applied.
- Ensure transactions comply with the 5-minute cooldown rule.

## API Endpoints
### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user and return JWT token

### Transactions
- `POST /api/transfer` - Transfer funds (enforces 5-minute cooldown for duplicate transactions)
- `GET /api/transactions` - Fetch user transaction history

## License
This project is licensed under the MIT License.

## Contributors
- Naman Singh - Full Stack Developer

## Contact
For any issues or feature requests, please open an issue on GitHub or contact singhnama64@gmail.com

