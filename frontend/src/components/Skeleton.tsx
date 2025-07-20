// RecipeSkeleton.tsx
import React from 'react';

export const SearchBarSkeleton: React.FC = () => {
    return (
      <div
        role="status"
        className="animate-pulse mt-5 p-4 border border-gray-300 rounded-md shadow-md w-full max-w-6xl mx-auto flex items-center space-x-4"
      >
        <div className="h-10 bg-gray-200 rounded-md flex-grow"></div>

        <div className="h-10 bg-gray-200 rounded-md w-24"></div>
      </div>
    );
  };

export const RecipeSkeleton: React.FC = () => {
  return (
    <div
      role="status"
      className="animate-pulse p-4 border border-gray-300 rounded-md shadow-md w-full max-w-sm mx-auto"
    >
      {/* Skeleton for image */}
      <div className="h-40 bg-gray-200 rounded-md mb-4"></div>
      
      {/* Skeleton for title */}
      <div className="h-6 bg-gray-200 w-full mb-2 rounded"></div>
      
      {/* Skeleton for description */}
      <div className="h-4 bg-gray-200 w-full mb-2 rounded"></div>
      <div className="h-4 bg-gray-200 w-5/6 rounded"></div>
      <div className="h-4 bg-gray-200 w-4/6 rounded"></div>
      
      {/* Optional: Skeleton for a button */}
      <div className="h-8 bg-gray-200 w-1/3 mt-4 rounded"></div>
    </div>
  );
};
