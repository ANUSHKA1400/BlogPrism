import * as jwtDecode from 'jwt-decode';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

class AuthService {
  // Login
  async login(email, password) {
    if (!apiBaseUrl) {
      // Fallback to mock implementation
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (email && password) {
            // Generate a mock JWT token
            const token = this.generateMockToken(email);
            const user = { email, name: email.split('@')[0] };
            
            // Store token in localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            
            resolve({ token, user });
          } else {
            reject(new Error('Invalid credentials'));
          }
        }, 1000);
      });
    }
    
    // Real API implementation
    try {
      const response = await fetch(`${apiBaseUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      if (!response.ok) {
        throw new Error('Invalid credentials');
      }
      
      const data = await response.json();
      
      // Store token and user in localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      return data;
    } catch (error) {
      // Handle network errors specifically
      if (error instanceof TypeError && error.message.includes('fetch')) {
        console.warn('Network error during login:', error.message);
        throw new Error('Network error - please check if the backend is running');
      }
      throw new Error(error.message || 'Login failed');
    }
  }

  // Signup
  async signup(name, email, password) {
    if (!apiBaseUrl) {
      // Fallback to mock implementation
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (name && email && password) {
            // Generate a mock JWT token
            const token = this.generateMockToken(email);
            const user = { email, name };
            
            // Store token in localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            
            resolve({ token, user });
          } else {
            reject(new Error('All fields are required'));
          }
        }, 1000);
      });
    }
    
    // Real API implementation
    try {
      const response = await fetch(`${apiBaseUrl}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Signup failed');
      }
      
      const data = await response.json();
      
      // Store token and user in localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      return data;
    } catch (error) {
      // Handle network errors specifically
      if (error instanceof TypeError && error.message.includes('fetch')) {
        console.warn('Network error during signup:', error.message);
        throw new Error('Network error - please check if the backend is running');
      }
      throw new Error(error.message || 'Signup failed');
    }
  }

  // Generate a mock JWT token
  generateMockToken(email) {
    const header = btoa('{"alg":"HS256","typ":"JWT"}');
    const payload = btoa(JSON.stringify({
      email,
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24), // 24 hours
      iat: Math.floor(Date.now() / 1000)
    }));
    const signature = btoa('signature'); // Mock signature
    
    return `${header}.${payload}.${signature}`;
  }

  // Logout
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  // Get current user
  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  // Get JWT token
  getToken() {
    return localStorage.getItem('token');
  }

  // Check if user is logged in
  isLoggedIn() {
    const token = this.getToken();
    if (!token) return false;
    
    try {
      const decoded = jwtDecode.default(token);
      return decoded.exp > Date.now() / 1000;
    } catch (e) {
      return false;
    }
  }

  // Check if user is admin
  isAdmin() {
    const user = this.getCurrentUser();
    if (!user) return false;
    
    // For the real API, we check the isAdmin flag
    // For demo, we'll consider users with 'admin' in their email as admins
    return user.isAdmin || user.email.includes('admin');
  }
}

export default new AuthService();