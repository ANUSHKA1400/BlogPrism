import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getCategories } from '../services';
import authService from '../services/auth';
import Search from './Search';

const Header = () => {
  const [categories, setCategories] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    getCategories().then((newCategories) => {
      setCategories(newCategories);
    });
    
    // Check if user is logged in
    const checkUserStatus = () => {
      const user = authService.getCurrentUser();
      setCurrentUser(user);
    };
    
    // Check user status immediately
    checkUserStatus();
    
    // Listen for login/logout events
    const handleUserLogin = () => {
      checkUserStatus();
    };
    
    const handleUserLogout = () => {
      setCurrentUser(null);
    };
    
    if (typeof window !== 'undefined') {
      window.addEventListener('user-login', handleUserLogin);
      window.addEventListener('user-logout', handleUserLogout);
    }
    
    // Clean up event listeners on component unmount
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('user-login', handleUserLogin);
        window.removeEventListener('user-logout', handleUserLogout);
      }
    };
  }, []);

  const handleLogout = () => {
    authService.logout();
    setCurrentUser(null);
    // Dispatch a custom event to notify other components of logout
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('user-logout'));
    }
    window.location.href = '/';
  };

  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="header w-full inline-block py-6 rounded-b-xl shadow-sm">
        <div className="md:float-left block">
          <Link href="/">
            <span className="cursor-pointer font-bold text-3xl text-gray-800">Blog Website</span>
          </Link>
        </div>
        
        <div className="hidden md:flex md:items-center md:justify-center md:space-x-6 md:ml-10">
          {categories.slice(0, 3).map((category) => (
            <Link key={category.slug} href={`/category/${category.slug}`}>
              <span className="text-gray-700 font-medium cursor-pointer hover:text-blue-600 transition-colors duration-300 rounded-lg px-3 py-1 hover:bg-gray-100">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
        
        <div className="md:float-right mt-2 flex items-center">
          <div className="mr-4">
            <Search />
          </div>
          
          {currentUser ? (
            <div className="flex items-center space-x-4">
              <Link href="/profile">
                <span className="text-gray-700 font-medium hidden md:inline cursor-pointer hover:text-blue-600 transition-colors duration-300 rounded-lg px-3 py-1 hover:bg-gray-100">
                  Profile
                </span>
              </Link>
              {authService.isAdmin() && (
                <Link href="/admin">
                  <span className="btn btn-secondary text-sm rounded-lg">
                    Admin
                  </span>
                </Link>
              )}
              <button 
                onClick={handleLogout}
                className="btn btn-secondary text-sm rounded-lg"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <span className="text-gray-700 font-medium cursor-pointer hover:text-blue-600 transition-colors duration-300 rounded-lg px-3 py-1 hover:bg-gray-100">
                  Login
                </span>
              </Link>
              <Link href="/signup">
                <span className="btn btn-primary text-sm rounded-lg">
                  Signup
                </span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header