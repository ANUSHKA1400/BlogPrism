import React, { useState, useEffect } from 'react';
import { checkApiHealth } from '../services/apiHealth';

const ApiStatusIndicator = () => {
  const [apiStatus, setApiStatus] = useState({ healthy: true, checking: true });

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const status = await checkApiHealth();
        setApiStatus({ ...status, checking: false });
      } catch (error) {
        setApiStatus({ 
          healthy: false, 
          checking: false, 
          error: 'Failed to check API status' 
        });
      }
    };

    checkStatus();
    
    // Check status every 60 seconds instead of 30 to be less intrusive
    const interval = setInterval(checkStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  // In development mode, don't show the warning if it's just a network issue
  // since we expect the API might not be running during development
  if (process.env.NODE_ENV === 'development' && apiStatus.error && 
      (apiStatus.error.includes('Network error') || apiStatus.error.includes('timed out'))) {
    return null;
  }

  if (apiStatus.checking) {
    return null; // Don't show anything while checking
  }

  if (apiStatus.healthy) {
    return null; // Don't show anything if healthy
  }

  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <p className="text-sm text-yellow-700">
            <span className="font-medium">Backend API unavailable.</span> Some features may not work properly. 
            Please ensure the backend server is running at {process.env.NEXT_PUBLIC_API_BASE_URL || 'the configured API endpoint'}.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ApiStatusIndicator;