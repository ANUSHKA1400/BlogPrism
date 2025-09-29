# BlogPrism 📝

### 🚀 An Online Platform for Modern Blogs 

## <img src="https://media.giphy.com/media/ObNTw8Uzwy6KQ/giphy.gif" width="30px">&nbsp;*****About the project:*****

BlogPrism is a modern blogging platform built with React, Next.js, and Tailwind CSS. It features a complete blogging system with user authentication, post management, and a responsive design.

## 🛠️ Tech Stack

- **Frontend**: React.js, Next.js, Tailwind CSS, Sass
- **Backend**: Node.js, Express.js
- **Authentication**: JWT (JSON Web Tokens)
- **Database**: In-memory storage (can be extended to MongoDB, PostgreSQL, etc.)
- **Deployment**: Vercel (frontend), custom Node.js server (backend)

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Running the Complete Application

1. **Start the Backend Server:**
   ```bash
   # Method 1: Using the custom start script (recommended)
   npm run start:backend
   
   # Method 2: Navigate to the backend directory and start directly
   cd backend
   npm start
   
   # Method 3: Direct node execution (from backend directory)
   cd backend
   node server.js
   ```
   The backend will run on http://localhost:5000

2. **Start the Frontend Development Server:**
   ```bash
   # In a new terminal, from the root directory
   npm install
   npm run dev
   ```
   The frontend will run on http://localhost:3000 (or next available port)

### Testing the API Connection

You can test if the frontend is successfully connecting to the backend by visiting:
http://localhost:3000/api-test

This page will show you if the connection is working and display sample data from the API.

### Default Users for Testing

- **Admin User:**
  - Email: admin@example.com
  - Password: admin123

- **Regular User:**
  - Email: user@example.com
  - Password: user123

## 📁 Project Structure

```
BlogPrism/
├── backend/           # Node.js Express backend API
│   ├── server.js      # Main server file
│   ├── package.json   # Backend dependencies
│   └── README.md      # Backend documentation
├── components/        # React components
├── pages/             # Next.js pages
├── services/          # API service layers
├── styles/            # CSS and Tailwind styles
└── public/            # Static assets
```

## 🌟 Features

- User authentication (login/signup)
- Create, read, update, and delete blog posts
- Rich text editor for post content
- Category management
- Search functionality
- Like system for posts
- Responsive design for all devices
- Admin dashboard for content management
- User profile management

## 🚀 Deployment

### Frontend (Vercel)
The frontend can be deployed to Vercel with the standard Next.js deployment process.

### Backend
The backend can be deployed to any Node.js hosting platform (Heroku, DigitalOcean, AWS, etc.).

## 📝 Notes

- The application uses environment variables for API configuration. Check `.env.local` for settings.
- The backend API runs on port 5000 by default.
- The frontend development server runs on port 3000 by default.
- When the backend is not accessible, the application falls back to mock data to ensure basic functionality.
- The connection between frontend and backend has been successfully established.

## 📎 Original Project Info

###### I have built the BlogPrism in order to learn State Management in React, Tailwind CSS and the properties of GraphQL . With GraphQL , it's easier to fetch data and use it accordingly . The GraphCMS allows a very beginner-friendly process to consider different variables (schemas, models and fields) in any website . I have used moment library for data type and sass for styling purpose. 

###### TechStack Used : React.js , Next.js , Tailwind CSS , GraphQL , Sass , vercel .
###### Deployed using vercel :-

###### Web App link : https://blog-prism.vercel.app/

https://user-images.githubusercontent.com/89868832/165784179-a3d53f8d-e3d9-4109-9717-35c0125f589d.mp4