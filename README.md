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

```env
# Clone the repository
git clone <https://github.com/arun-poudel/ToDO-List>

# Navigate to the project folder
cd todo-list-api

# Install dependencies
npm install

# Start the server
npm start 

```
## 4️⃣ API Documentation 
#Endpoints

| Method | Endpoint        | Description                              |
|------:|-----------------|------------------------------------------|
| GET   | `/`             | Health check / system status             |
| POST  | `/todos`        | Create a new task                        |
| GET   | `/todos/all`    | Fetch all tasks (newest first)           |
| PUT   | `/todos/:id`    | Update task (title, description, status) |
| DELETE| `/todos/:id`    | Remove a task permanently                |


## 5️⃣ Database Schema

The application uses a PostgreSQL database with the following table structure:

### `todos` Table

| Column      | Type                        | Constraints              | Description                    |
|:------------|:----------------------------|:-------------------------|:-------------------------------|
| id          | SERIAL                      | PRIMARY KEY              | Auto-incrementing unique ID    |
| title       | VARCHAR(255)                | NOT NULL                 | Task title                     |
| description | TEXT                        | NULL                     | Optional task details          |
| completed   | BOOLEAN                     | DEFAULT false            | Task completion status         |
| created_at  | TIMESTAMP                   | DEFAULT CURRENT_TIMESTAMP| Timestamp of task creation     |

### SQL Schema
```sql
CREATE TABLE todos (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 6️⃣ Error Handling

The API implements comprehensive error handling with standard HTTP status codes:

| Status Code | Meaning                    | When It Occurs                           |
|------------:|:---------------------------|:-----------------------------------------|
| 200         | OK                         | Successful GET, PUT, DELETE operations   |
| 201         | Created                    | Task successfully created                |
| 400         | Bad Request                | Missing required fields (e.g., title)    |
| 404         | Not Found                  | Task with specified ID doesn't exist     |
| 500         | Internal Server Error      | Database or server-side errors           |

---

## 7️⃣ Testing the API

### Using cURL
```bash
# Create a task
curl -X POST http://localhost:3000/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "Learn Node.js", "description": "Build REST APIs"}'

# Get all tasks
curl http://localhost:3000/todos/all

# Update a task
curl -X PUT http://localhost:3000/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'

# Delete a task
curl -X DELETE http://localhost:3000/todos/1
```

### Using Postman or Thunder Client

1. Import the endpoints listed in the API Documentation section
2. Set the base URL to `http://localhost:3000`
3. For POST/PUT requests, add JSON body with appropriate fields
4. Set `Content-Type: application/json` in headers

---

## 8️⃣ Project Structure
```
todo-list-api/
│
├── node_modules/          # Dependencies
├── .env                   # Environment variables (sample is give above in point 2)
├── .gitignore            # Git ignore file
├── package.json          # Project metadata & dependencies
├── package-lock.json     # Locked dependency versions
├── server.js             # Main application file
└── README.md             # Project documentation
```

---

## 9️⃣ Future Enhancements

- [ ] Add user authentication (JWT)
- [ ] Implement task categories/tags
- [ ] Add due dates and priority levels
- [ ] Create a frontend interface
- [ ] Add pagination for large datasets
- [ ] Implement search and filter functionality
- [ ] Add input validation middleware

---

## 🤝 Contributing

<span style="color: green; font-weight: bold;">
Contributions are welcome! Please feel free to submit a Pull Request.
</span>

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---



## 👨‍💻 Author

**Arun Poudel**

- GitHub: [@arun-poudel](https://github.com/arun-poudel)

---

## 🙏 Acknowledgments

- Express.js documentation
- PostgreSQL community
- Node.js ecosystem

---

**⭐ If you found this project helpful, please give it a star!**