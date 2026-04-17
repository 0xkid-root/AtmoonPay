import React from 'react';
import LoadingSpinner from './LoadingSpinner';

const PageLoader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <LoadingSpinner size="lg" text="Initializing..." />
        <p className="mt-4 text-sm text-gray-500">Setting up your workspace</p>
      </div>
    </div>
  );
};

export default PageLoader;
