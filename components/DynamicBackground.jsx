import React, { useEffect } from 'react';

const DynamicBackground = () => {
  useEffect(() => {
    // Define only 2 contrasting gradient backgrounds
    const gradients = [
      'linear-gradient(135deg, #1a2a6c, #2a4d69, #4b86b4)',  // Blue gradient
      'linear-gradient(135deg, #3A1C71, #D76D77, #FFAF7B)'   // Purple gradient
    ];
    
    let currentGradient = 0;
    
    // Function to change the background
    const changeBackground = () => {
      // Update the background on the body element
      document.body.style.background = gradients[currentGradient];
      
      // Also update the before pseudo-element if it exists
      const style = document.createElement('style');
      style.innerHTML = `
        html:before {
          background: ${gradients[currentGradient]} !important;
        }
      `;
      document.head.appendChild(style);
      
      // Clean up the style element after a short delay
      setTimeout(() => {
        if (style.parentNode) {
          style.parentNode.removeChild(style);
        }
      }, 1000);
      
      // Move to the next gradient
      currentGradient = (currentGradient + 1) % gradients.length;
    };
    
    // Change background immediately on load
    changeBackground();
    
    // Change background every 5 seconds
    const interval = setInterval(changeBackground, 5000);
    
    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);
  
  return null; // This component doesn't render anything visible
};

export default DynamicBackground;