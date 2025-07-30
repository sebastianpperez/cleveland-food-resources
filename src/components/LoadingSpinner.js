import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = ({ size = 'md', message = 'Loading...' }) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <Loader2 className={`${sizeClasses[size]} animate-spin text-primary-600 mb-3`} />
      <p className="text-gray-600 text-sm">{message}</p>
    </div>
  );
};

const LoadingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
          <LoadingSpinner size="lg" message="Loading Cleveland Food Resources..." />
          <p className="text-gray-500 text-sm mt-4">
            Preparing real-time food assistance information
          </p>
        </div>
      </div>
    </div>
  );
};

const LoadingOverlay = ({ isVisible, message = 'Loading...' }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
        <LoadingSpinner message={message} />
      </div>
    </div>
  );
};

export { LoadingSpinner, LoadingPage, LoadingOverlay };
export default LoadingSpinner;