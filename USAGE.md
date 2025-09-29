# BlogPrism Usage Guide

This guide explains how to use all the features of BlogPrism, a complete blogging platform with user authentication and content management.

## Getting Started

1. Make sure both the backend and frontend servers are running:
   - Backend: http://localhost:5000
   - Frontend: http://localhost:4000

2. Open your browser and navigate to the frontend URL.

## User Authentication

### Login
1. Click on the "Login" link in the header
2. Enter your credentials:
   - For admin access: admin@example.com / admin123
   - For regular user: user@example.com / user123
3. Click "Login"

### Signup
1. Click on the "Signup" link in the header
2. Fill in your name, email, and password
3. Click "Signup"

### Logout
1. Click on the "Logout" button in the header when you're logged in

## Blog Post Features

### Viewing Posts
- Browse posts on the homepage
- Click "Read More" to view the full post
- Posts are organized by categories

### Creating Posts (Admin/Authenticated Users)
1. Log in to your account
2. Click on "Admin" in the header
3. Click "Create New Post"
4. Fill in the post details:
   - Title
   - Excerpt
   - Content (using the rich text editor)
   - Featured Image URL
   - Categories
5. Click "Create Post"

### Editing Posts (Admin/Authenticated Users)
1. Log in to your account
2. Go to the Admin Dashboard
3. Find the post you want to edit
4. Click the "Edit" button
5. Make your changes
6. Click "Update Post"

### Deleting Posts (Admin/Authenticated Users)
1. Log in to your account
2. Go to the Admin Dashboard
3. Find the post you want to delete
4. Click the "Delete" button
5. Confirm the deletion

## User Features

### Profile Management
1. Log in to your account
2. Click on "Profile" in the header
3. View your profile information
4. (Future feature: Edit profile details)

### Liking Posts
1. Navigate to any post
2. Click the heart icon to like the post
3. The like count will update immediately

### Searching Posts
1. Use the search bar in the header
2. Type your search query
3. View the search results

## Admin Features

### Admin Dashboard
1. Log in with an admin account (admin@example.com)
2. Click on "Admin" in the header
3. Manage all posts from the dashboard:
   - Create new posts
   - Edit existing posts
   - Delete posts
   - View post statistics

## Categories
- Browse posts by category using the category links in the header
- Each post can belong to multiple categories

## Responsive Design
- The application works on mobile, tablet, and desktop devices
- The layout automatically adjusts to different screen sizes

## Troubleshooting

### Common Issues

1. **"Content not available" when viewing posts**
   - This usually happens when the API is not properly configured
   - Check that both the backend and frontend servers are running
   - Verify the environment variables in `.env.local`

2. **Cannot login or signup**
   - Make sure the backend server is running on port 5000
   - Check the browser console for any error messages
   - Verify that you're using the correct credentials

3. **Posts not loading**
   - Check the network tab in browser developer tools
   - Verify that the API endpoints are accessible
   - Make sure there are no CORS issues

### Environment Variables

Make sure your `.env.local` file contains:
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
```

## Development

### Adding New Features

1. **Adding a new API endpoint**
   - Modify `backend/server.js` to add new routes
   - Update the corresponding service file in `services/`
   - Use the service in your components

2. **Adding a new page**
   - Create a new file in the `pages/` directory
   - Follow Next.js page conventions
   - Add navigation links in the header if needed

3. **Adding new components**
   - Create new files in the `components/` directory
   - Import and use components in pages
   - Follow the existing component structure

### Testing

1. **Unit Testing**
   - (Future feature: Add testing framework)

2. **Manual Testing**
   - Test all user flows:
     - Login/Signup
     - Post creation/editing/deletion
     - Profile management
     - Search functionality
     - Admin features

### Deployment

1. **Frontend Deployment**
   - Can be deployed to Vercel, Netlify, or similar platforms
   - Follow the standard Next.js deployment process

2. **Backend Deployment**
   - Can be deployed to Heroku, DigitalOcean, AWS, or similar platforms
   - Make sure to set the environment variables on the hosting platform

## Support

For issues, questions, or contributions, please:
1. Check the existing documentation
2. Review the code comments
3. Submit an issue on the repository
4. Contact the development team