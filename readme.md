# Node.js CRUD Application for Users

This Node.js application performs CRUD operations on users, including the generation of daily reports using cron jobs. The application uses Express.js, MySQL, Sequelize, and other dependencies.

## Technologies Used

- exceljs: 4.4.0
- express: 4.19.2
- express-validator: 7.1.0
- mysql2: 3.9.7
- node-cron: 3.0.3

## Prerequisites
- Node.js 19.9.0 or later
- npm 

## Getting Started

### Steps to Run the Project


1. **Clone the project directory:**
    ```bash
    git clone https://github.com/jyotiyadav2705/User-Management.git
    ```

2. **Navigate to the project directory:**

    ```bash
    cd User-Management
    ```

3. **Install dependencies:**

    ```bash
    npm install
    ```

4. **Set up the database connection:**

    In your project, create a `.env` file with the following contents, replacing with your actual database configuration:

    ```env
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=yourpassword
    DB_NAME=userdb
    ```

5. **Start the server:**

    ```bash
    npm start
    ```

    The server will be running at `http://localhost:8080`.

## API Endpoints

1. **Fetch list of all users:**

    ```http
    GET /users
    ```
    Response body:

    ```json
    {
    "message": "Success",
    "data": [
        {
            "id": 5,
            "email": "john@gal.com",
            "name": "john",
            "isActive": false,
            "createdAt": "2024-05-21T17:05:53.000Z",
            "updatedAt": "2024-05-21T17:06:13.000Z"
        },
        {
            "id": 4,
            "email": "john@gamail.com",
            "name": "john2",
            "isActive": false,
            "createdAt": "2024-05-21T17:05:48.000Z",
            "updatedAt": "2024-05-22T07:01:58.000Z"
        },
        {
            "id": 3,
            "email": "john@gmail.com",
            "name": "john",
            "isActive": true,
            "createdAt": "2024-05-21T17:05:41.000Z",
            "updatedAt": "2024-05-21T17:05:41.000Z"
        },
        {
            "id": 2,
            "email": "john@gmail.in",
            "name": "john",
            "isActive": true,
            "createdAt": "2024-05-21T17:05:31.000Z",
            "updatedAt": "2024-05-21T17:05:31.000Z"
        },
        {
            "id": 1,
            "email": "john@w.qr",
            "name": "john",
            "isActive": true,
            "createdAt": "2024-05-21T13:59:37.000Z",
            "updatedAt": "2024-05-21T16:55:07.000Z"
        }
    ],
    "count": 5
    }
    ```


2. **Create a user:**

    ```http
    POST /users
    ```

    Request body:

    ```json
    {
      "email": "john@gal.com",
      "name": "john"
    }
    ```
    Response body:
    
    ```json
    {
    "message": "User Created Successfully!",
    "data": {
        "isActive": true,
        "id": 6,
        "email": "john@mail.com",
        "name": "john",
        "updatedAt": "2024-05-30T13:38:47.461Z",
        "createdAt": "2024-05-30T13:38:47.461Z"
    }
    }
    ```

3. **Fetch a single user by ID:**

    ```http
    GET /users/:userID
    ```
    Response body:
    
    ```json
    {
    "message": "Success!",
    "data": {
        "id": 3,
        "email": "john@gmail.com",
        "name": "john",
        "isActive": true,
        "createdAt": "2024-05-21T17:05:41.000Z",
        "updatedAt": "2024-05-21T17:05:41.000Z"
    }
    }
    ```

4. **Update an existing user by ID:**

    ```http
    PUT /users/:userID
    ```

    Request body:

    ```json
    {
      "email": "john@gal.com",
      "name": "john"
    }
    ```
    Response body:
    
    ```json
    {
    "message": "User Updated Successfully!"
    }
    ```

    (User can update any one or both fields)

5. **Delete an existing user by ID:**

    ```http
    DELETE /users/:userID
    ```
    Response body:
    
    ```json
    {
    "message": "User Deleted Successfully!"
    }
    ```

## Cron Job for Daily Report

This application includes a cron job that generates a report of newly added users daily at 11:59 PM. The report is created as an Excel file and stored in the `public` folder.


## Repository
[GitHub Repository](https://github.com/jyotiyadav2705/User-Management.git)

