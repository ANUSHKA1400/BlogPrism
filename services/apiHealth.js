// Utility function to check API health
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const checkApiHealth = async () => {
  // In development mode, we might expect the API to be unavailable
  // so we'll be more lenient with the health check
  if (process.env.NODE_ENV === 'development') {
    // Try a simple fetch but with a shorter timeout
    if (!apiBaseUrl) {
      return { healthy: false, error: 'API base URL not configured' };
    }

    try {
      // Use a very short timeout for development
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000); // 2 second timeout
      
      const response = await fetch(`${apiBaseUrl}/posts`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      return { 
        healthy: response.ok, 
        status: response.status,
        error: response.ok ? null : `API returned status ${response.status}`
      };
    } catch (error) {
      // In development, if we get a network error, we'll consider it non-critical
      // but still report it for debugging purposes
      if (error.name === 'AbortError') {
        return { healthy: false, error: 'API health check timed out (development mode)' };
      }
      return { healthy: false, error: `Network error: ${error.message} (development mode)` };
    }
  }
  
  // Production mode - stricter health checks
  if (!apiBaseUrl) {
    return { healthy: false, error: 'API base URL not configured' };
  }

  try {
    const response = await fetch(`${apiBaseUrl}/posts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Set a reasonable timeout for production
      signal: AbortSignal.timeout(5000)
    });
    
    return { 
      healthy: response.ok, 
      status: response.status,
      error: response.ok ? null : `API returned status ${response.status}`
    };
  } catch (error) {
    if (error.name === 'AbortError') {
      return { healthy: false, error: 'API health check timed out' };
    }
    return { healthy: false, error: `Network error: ${error.message}` };
  }
};

export default { checkApiHealth };