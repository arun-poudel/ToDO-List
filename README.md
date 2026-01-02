# ToDO-List
# 🚀 Todo List API (Project #1)

A robust RESTful API built with **Node.js**, **Express**, and **PostgreSQL**.  
This project serves as a foundational backend for managing tasks with full **CRUD (Create, Read, Update, Delete)** functionality.

---

## 🛠 Features

- **Full CRUD Operations**  
  Create, view, update, and delete tasks.

- **Persistent Storage**  
  Data is securely stored in a PostgreSQL database.

- **Partial Updates**  
  Smart updates using SQL `COALESCE` to prevent accidental data loss.

- **Security First**  
  Uses **parameterized queries** to protect against SQL injection.

- **Environment Variables**  
  Secure configuration for database credentials using `.env`.

---

## 🏗 Setup Instructions

### 1️⃣ Prerequisites

Ensure you have the following installed:

- **Node.js** (v14 or higher)
- **PostgreSQL**

---

### 2️⃣ Database Configuration

Create a `.env` file in the root directory and add the following:

```env
PORT=3000
DB_USER=your_postgres_username
DB_HOST=localhost
DB_NAME=your_database_name
DB_PASSWORD=your_password
DB_PORT=5432
```

## 3️⃣ Installation & Running the Server

```bash
# Clone the repository
git clone <https://github.com/arun-poudel/ToDO-List>

# Navigate to the project folder
cd todo-list-api

# Install dependencies
npm install

# Start the server
node index.js


