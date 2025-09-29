# BlogPrism Backend API

This is the backend API for the BlogPrism application. It provides RESTful endpoints for managing blog posts, user authentication, and other features.

## Features

- User authentication (login/signup) with JWT
- Blog post management (CRUD operations)
- Category management
- Search functionality
- Like functionality

## Technologies Used

- Node.js
- Express.js
- JSON Web Tokens (JWT) for authentication
- Bcrypt for password hashing

## Setup Instructions

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the server:
   ```
   npm start
   ```
   
   Or for development with auto-restart:
   ```
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration

### Blog Posts
- `GET /api/posts` - Get all posts
- `GET /api/posts/:slug` - Get a specific post by slug
- `POST /api/posts` - Create a new post (requires authentication)
- `PUT /api/posts/:slug` - Update a post (requires authentication)
- `DELETE /api/posts/:slug` - Delete a post (requires authentication)
- `POST /api/posts/:slug/like` - Like a post

### Categories
- `GET /api/categories` - Get all categories

### Search
- `GET /api/search?q=query` - Search posts by query

## Environment Variables

The backend uses the following environment variables:

- `PORT` - Port to run the server on (default: 5000)
- `JWT_SECRET` - Secret key for JWT token generation

## Default Users

The backend comes with two default users for testing:

1. Admin User:
   - Email: admin@example.com
   - Password: admin123

2. Regular User:
   - Email: user@example.com
   - Password: user123

## Development

To run the backend in development mode with auto-restart:

```
npm run dev
```

This uses nodemon to automatically restart the server when code changes are detected.