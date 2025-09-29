// Test file to check if services are working
console.log('Testing services...');

// Test importing the blog service
try {
  const blogService = require('./services/blog');
  console.log('Blog service imported successfully');
} catch (error) {
  console.error('Error importing blog service:', error.message);
}

// Test importing the auth service
try {
  const authService = require('./services/auth');
  console.log('Auth service imported successfully');
} catch (error) {
  console.error('Error importing auth service:', error.message);
}

// Test importing the main service
try {
  const mainService = require('./services/index');
  console.log('Main service imported successfully');
} catch (error) {
  console.error('Error importing main service:', error.message);
}

console.log('Test completed');