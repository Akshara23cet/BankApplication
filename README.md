# FinVault Bank | Full-Stack Online Banking Portal

A premium, secure online banking web application built with **Spring Boot (Java)**, **React (JavaScript)**, and **MySQL**.

This project has been upgraded from a legacy console application into a modern, resume-ready full-stack software project featuring a responsive glassmorphic dashboard interface, secure session management, and robust transactional business logic.

---

## 🚀 Key Features

*   **🔒 Secure Session Authentication**: Login securely using your auto-generated Account Number and 4-digit PIN. Sessions are managed securely using `sessionStorage`.
*   **💳 Dynamic Visual Debit Card**: A styled mock debit card component that displays the account holder's name, masked account number, and real-time balance.
*   **💵 Deposit & Withdraw Funds**: Instant simulation of bank account deposits and cash-out withdrawals with input validation.
*   **💸 Real-Time Money Transfer**: Send funds securely to any destination account. The system validates receiver availability, verifies sufficient balances, and performs transactions.
*   **📄 Transaction Logs & Filtering**: View complete transactional history with filters for Deposits, Withdrawals, and Transfers, alongside color-coded transaction badges.
*   **🛡️ Authentication Guards**: Route guards automatically protect private dashboard views, redirecting unauthenticated users to the portal gateway.

---

## 🧱 Architecture & Project Structure

The project follows a clean, decoupled **Client-Server Architecture**:

### ☕ Backend (Spring Boot REST API)
Exposes REST endpoints on port `8080` and connects to MySQL via raw JDBC to demonstrate low-level database operations:
*   `src/main/java/com/bank/model` — Data classes (`User`, `Transaction`).
*   `src/main/java/com/bank/dao` — Database access objects executing SQL queries.
*   `src/main/java/com/bank/service` — Layer containing transaction business logic.
*   `src/main/java/com/bank/controller` — REST controllers managing HTTP mappings and CORS.
*   `schema.sql` — MySQL database configuration and table structures.

### ⚛️ Frontend (React SPA)
A modern client interface built using React and styled with modular, premium vanilla CSS layouts:
*   `bank-frontend/src/Components` — Pages (`Dashboard`, `Deposit`, `Withdraw`, `Transfer`, `Transactions`, `Balance`) and layout structures (`SidebarLayout`).
*   `bank-frontend/src/styles.css` — Custom glassmorphism, responsive grids, and neon CSS tokens.

---

## 🛠️ Tech Stack

*   **Backend**: Java 17+, Spring Boot 3.2.5, JDBC, Maven
*   **Frontend**: React 19, React Router v7, JavaScript, HTML5, Vanilla CSS
*   **Database**: MySQL Server 8.0+

---

## ⚙️ How to Set Up and Run

### 1. Database Setup
1. Open your MySQL client (e.g., MySQL Workbench or Command Line).
2. Execute the queries inside the [schema.sql](schema.sql) file to create the `bankdb` database and the `users` and `transactions` tables.
3. Make sure the database credentials in `com/bank/utils/DBConnection.java` match your local MySQL configuration:
    ```java
    DriverManager.getConnection("jdbc:mysql://localhost:3306/bankdb", "username", "password");
    ```

### 2. Run the Backend API
1. Navigate to the root directory containing `pom.xml`.
2. Run the Spring Boot application using Maven:
    ```bash
    mvn spring-boot:run
    ```
    The server will start on [http://localhost:8080](http://localhost:8080).

### 3. Run the React Frontend
1. Navigate to the `bank-frontend` directory:
    ```bash
    cd bank-frontend
    ```
2. Install the necessary node packages:
    ```bash
    npm install
    ```
3. Start the React development server:
    ```bash
    npm start
    ```
    The app will open automatically in your browser at [http://localhost:3000](http://localhost:3000).
