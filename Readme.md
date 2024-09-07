# Blog Platform API

This is a generic backend template for a blog platform built using **Node.js**, **Express**, **MongoDB**, and **Zod** for input validation. It includes user authentication (with JWT) and CRUD operations for blog posts. Users can register, log in, and manage blog posts with public visibility or user-specific restrictions.

## Table of Contents

- [Installation](#installation)
- [Features](#features)
- [Endpoints](#endpoints)
  - [User Management](#user-management-endpoints)
  - [Blog Platform](#blog-platform-endpoints)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [License](#license)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/rk4rohankumar/Blog
   cd Blog
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following variables:
   ```bash
   PORT=5000
   MONGODB_URI=your-mongodb-uri
   JWT_SECRET=your-secret-key
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

## Features

- **User Authentication**: Secure user registration and login with password hashing using `bcryptjs` and JWT-based authorization.
- **CRUD Operations**: Users can create, read, update, and delete blog posts.
- **Public & Private Posts**: Users can publish posts as public or private. Public posts are visible to all, while private posts are restricted to the owner.
- **Authorization**: Users can only edit or delete their own posts, requiring authentication.
- **Input Validation with Zod**: Input validation using Zod to ensure proper data structure for both user management and blog post creation.

## Endpoints

### User Management Endpoints

- **POST /users/register** - User Registration
  - **Inputs**: `username`, `email`, `password`
  - **Actions**: Creates a new user account after validating the input using Zod. Returns a success message or an error (e.g., email already in use).

- **POST /users/login** - User Login
  - **Inputs**: `email/username`, `password`
  - **Actions**: Authenticates the user and returns a JWT token for subsequent authorized requests.

### Blog Platform Endpoints

- **GET /postsAll** - Retrieve All Blog Posts
  - **Actions**: Fetches all blog posts, both public and user-specific, based on authorization(admin/user).

- **GET /posts** - Retrieve Public and User-Specific Blog Posts
  - **Actions**: Fetches all public posts and the authenticated user's private posts.

- **POST /posts** - Create a New Blog Post
  - **Inputs**: `title`, `body`, `status` (optional)
  - **Actions**: Creates a new blog post associated with the authenticated user. The input is validated using Zod, and authentication is required.

- **GET /posts/:id** - Retrieve a Single Blog Post by ID
  - **Actions**: Fetches the details of a specific blog post. Public posts are accessible to all, while private posts are restricted to the owner.

- **PUT /posts/:id** - Update a Blog Post by ID
  - **Inputs**: `title`, `body`
  - **Actions**: Updates the specified blog post if the authenticated user is the owner. Zod validates the input data. Requires authentication.

- **DELETE /posts/:id** - Delete a Blog Post by ID
  - **Actions**: Deletes the specified blog post if the authenticated user is the owner. Requires authentication.

## Technologies Used

- **Node.js**: JavaScript runtime for backend development.
- **Express**: Web framework for creating API endpoints.
- **MongoDB**: NoSQL database for data storage.
- **Mongoose**: ORM for MongoDB.
- **JWT (jsonwebtoken)**: For authentication and authorization using JSON Web Tokens.
- **bcryptjs**: For hashing passwords to enhance security.
- **Zod**: For schema-based validation of user inputs, ensuring all incoming data is properly structured and secure.
- **dotenv**: For managing environment variables.
- **Nodemon**: For automatically restarting the server during development.

## Project Structure

```bash
├── controllers
│   ├── authController.js      # Handles user registration and login
│   ├── postController.js      # Handles blog post-related actions
├── middlewares
│   └── authMiddleware.js      # Middleware for checking authentication via JWT
├── models
│   ├── Post.js                # Post schema
│   └── User.js                # User schema       # Zod schemas for validating inputs
├── routes
│   ├── postRoutes.js          # Blog post routes
│   └── userRoutes.js          # User management routes
├── utils
│   └── Auth.js                # Zod validation schemas for user inputs 
├── app.js                     # Main app entry point
└── .env                       # Environment variables file
```

## License

This project is licensed under the ISC License. See the `LICENSE` file for more details.