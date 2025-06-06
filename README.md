<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Project Structure

```
src/
├── app.module.ts
├── main.ts
├── auth/
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── auth.module.ts
│   ├── dto/
│   │   ├── login.dto.ts
│   │   └── register.dto.ts
│   ├── guards/
│   │   └── jwt-auth.guard.ts
│   └── strategies/
│       └── jwt.strategy.ts
├── tasks/
│   ├── tasks.controller.ts
│   ├── tasks.service.ts
│   ├── tasks.module.ts
│   ├── dto/
│   │   ├── create-task.dto.ts
│   │   └── update-task.dto.ts
│   └── schemas/
│       └── task.schema.ts
├── users/
│   ├── users.service.ts
│   ├── users.module.ts
│   └── schemas/
│       └── user.schema.ts
└── common/
    ├── decorators/
    │   └── get-user.decorator.ts
    └── filters/
        └── http-exception.filter.ts
```

## Description

## API Endpoints

### Authentication

- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user

### Tasks (Protected routes)

- `GET /tasks` - Get all tasks for authenticated user
- `GET /tasks/stats` - Get task statistics
- `GET /tasks/:id` - Get specific task
- `POST /tasks` - Create new task
- `PATCH /tasks/:id` - Update task
- `DELETE /tasks/:id` - Delete task

## Installation and Setup

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables:

```bash
cp .env.example .env
# Edit .env with your MongoDB connection string and JWT secret
```

3. Start MongoDB locally or use MongoDB Atlas

4. Run the application:

```bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```

## Features

- **Authentication**: JWT-based authentication with register/login
- **Authorization**: Route guards and user-specific data access
- **CRUD Operations**: Full Create, Read, Update, Delete for tasks
- **Data Validation**: Input validation using class-validator
- **Error Handling**: Global exception filter with proper error responses
- **Database**: MongoDB with Mongoose ODM
- **TypeScript**: Full TypeScript support with proper typing
- **Modular Architecture**: Well-organized modules following NestJS best practices
- **Task Management**: Status tracking, priority levels, due dates
- **Statistics**: Task analytics and reporting
- **Security**: Password hashing, JWT tokens, route protection

This is a production-ready NestJS application with proper project structure, error handling, validation, and security features.

## API Endpoints & Examples

### Authentication Endpoints

#### Register a New User

**POST** `/auth/register`

**Request:**

```json
{
  "email": "john.doe@example.com",
  "password": "securePassword123",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response (201):**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64a7b8c9d1e2f3a4b5c6d7e8",
    "email": "john.doe@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

**Error Response (409 - Conflict):**

```json
{
  "statusCode": 409,
  "timestamp": "2024-01-15T10:30:00.000Z",
  "path": "/auth/register",
  "method": "POST",
  "message": "User with this email already exists"
}
```

#### Login User

**POST** `/auth/login`

**Request:**

```json
{
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

**Response (200):**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64a7b8c9d1e2f3a4b5c6d7e8",
    "email": "john.doe@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

**Error Response (401 - Unauthorized):**

```json
{
  "statusCode": 401,
  "timestamp": "2024-01-15T10:30:00.000Z",
  "path": "/auth/login",
  "method": "POST",
  "message": "Invalid credentials"
}
```

---

### Task Management Endpoints (Protected Routes)

**Note:** All task endpoints require Bearer token in Authorization header:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### Create a New Task

**POST** `/tasks`

**Request:**

```json
{
  "title": "Complete project documentation",
  "description": "Write comprehensive documentation for the NestJS project",
  "status": "TODO",
  "priority": "HIGH",
  "dueDate": "2024-01-20T18:00:00.000Z"
}
```

**Response (201):**

```json
{
  "_id": "64a7b8c9d1e2f3a4b5c6d7e9",
  "title": "Complete project documentation",
  "description": "Write comprehensive documentation for the NestJS project",
  "status": "TODO",
  "priority": "HIGH",
  "dueDate": "2024-01-20T18:00:00.000Z",
  "userId": "64a7b8c9d1e2f3a4b5c6d7e8",
  "isCompleted": false,
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```
