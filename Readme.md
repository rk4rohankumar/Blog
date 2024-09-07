# Blog Platform API

This is a generic backend template for a blog platform built using **Node.js**, **Express**, and **MongoDB**. It includes user authentication (with JWT) and CRUD operations for blog posts. Users can register, log in, and manage blog posts, with public visibility or user-specific restrictions.

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
   git clone https://github.com/your-repo/blog-platform.git
   cd blog-platform
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

- **User Authentication**: Register and log in users with secure password hashing using `bcryptjs` and JWT-based authorization.
- **CRUD Operations**: Create, read, update, and delete blog posts.
- **Public & Private Posts**: Posts can be publicly visible or restricted to the owner.
- **Authorization**: Only the authenticated user can edit or delete their posts.
  
## Endpoints

### User Management Endpoints

- **POST /users/register** - User Registration
  - **Inputs**: `username`, `email`, `password`
  - **Actions**: Creates a new user account after validating the input. Returns a success message or an error (e.g., email already in use).

- **POST /users/login** - User Login
  - **Inputs**: `email/username`, `password`
  - **Actions**: Authenticates the user and returns a JWT token for subsequent authorized requests.

### Blog Platform Endpoints

- **GET /postsAll** - Retrieve All Blog Posts
  - **Actions**: Fetches all blog posts, either public or user-specific, based on authentication.

- **GET /posts** - Retrieve Public and User-Specific Blog Posts
  - **Actions**: Fetches all public posts and the authenticated user's private posts.

- **POST /posts** - Create a New Blog Post
  - **Inputs**: `title`, `body`
  - **Actions**: Creates a new blog post associated with the authenticated user. Requires authentication.

- **GET /posts/:id** - Retrieve a Single Blog Post by ID
  - **Actions**: Fetches the details of a specific blog post. Public posts are accessible to all, while private posts are only accessible to the owner.

- **PUT /posts/:id** - Update a Blog Post by ID
  - **Inputs**: `title`, `body`
  - **Actions**: Updates the specified blog post if the authenticated user is the owner. Requires authentication.

- **DELETE /posts/:id** - Delete a Blog Post by ID
  - **Actions**: Deletes the specified blog post if the authenticated user is the owner. Requires authentication.

## Technologies Used

- **Node.js**: JavaScript runtime
- **Express**: Web framework
- **MongoDB**: NoSQL database
- **JWT (jsonwebtoken)**: Authentication and authorization
- **bcryptjs**: Password hashing
- **Mongoose**: MongoDB ORM
- **dotenv**: Environment variable management
- **Nodemon**: Development tool for automatic server restarts

## Project Structure

```bash
├── controllers
│   ├── postController.js      # Handles blog post-related actions
│   ├── userController.js      # Handles user registration and login
├── middlewares
│   └── authMiddleware.js      # Middleware for checking authentication via JWT
├── models
│   ├── Post.js                # Post schema
│   └── User.js                # User schema
├── routes
│   ├── postRoutes.js          # Blog post routes
│   └── userRoutes.js          # User management routes
├── app.js                     # Main app entry point
└── .env                       # Environment variables file
```

## License

This project is licensed under the ISC License. See the `LICENSE` file for more details.