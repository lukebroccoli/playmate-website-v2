import React, { useEffect } from 'react';
import { useTheme } from 'next-themes';

export default function LoadingScreen() {
  const { setTheme } = useTheme();

  // Set theme based on system preference on component mount
  useEffect(() => {
    setTheme('system');
  }, [setTheme]);

  return (
    <div className="fixed inset-0 bg-background flex flex-col items-center justify-center z-50">
      {/* Logo with bounce animation */}
      <div className="mb-8 animate-bounce">
        <div className="relative">
          <div className="h-16 w-16 rounded-full bg-purple-600 flex items-center justify-center text-white text-xl font-bold">
            PM
          </div>
          

        </div>
      </div>
      
      {/* Loading spinner */}
      <div className="h-8 w-8 border-4 border-t-purple-600 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mb-4"></div>
      
      {/* Loading text */}
      <p className="text-muted-foreground text-sm">Loading your experience...</p>
    </div>
  );
}