
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center space-y-3 p-4">
      <div className="w-12 h-12">
        <div className="grid grid-cols-2 grid-rows-2 gap-1 w-full h-full">
          <span className="animate-pulse bg-purple-500 rounded-md opacity-75 w-full h-full"></span>
          <span className="animate-pulse bg-pink-500 rounded-md opacity-75 w-full h-full [animation-delay:0.1s]"></span>
          <span className="animate-pulse bg-pink-500 rounded-md opacity-75 w-full h-full [animation-delay:0.2s]"></span>
          <span className="animate-pulse bg-purple-500 rounded-md opacity-75 w-full h-full [animation-delay:0.3s]"></span>
        </div>
      </div>
      <span className="text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
        Generating Your Art...
      </span>
    </div>
  );
};

export default LoadingSpinner;
