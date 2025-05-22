
import React from 'react';

interface PixelArtDisplayProps {
  imageUrl: string | null;
  prompt: string; 
}

const PixelArtDisplay: React.FC<PixelArtDisplayProps> = ({ imageUrl, prompt }) => {
  if (!imageUrl) {
    return (
      <div className="aspect-square w-full max-w-md md:max-w-lg lg:max-w-xl bg-gray-800 bg-opacity-50 rounded-xl flex flex-col items-center justify-center text-gray-500 shadow-xl border-2 border-gray-700 p-6">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-20 h-20 text-gray-600 mb-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
        </svg>
        <span className="text-lg text-center">Your generated pixel art will appear here.</span>
        <span className="text-sm text-gray-600 mt-1 text-center">Enter a prompt above and click generate!</span>
      </div>
    );
  }

  return (
    <div className="aspect-square w-full max-w-md md:max-w-lg lg:max-w-xl rounded-xl overflow-hidden shadow-2xl border-2 border-purple-600 p-1 bg-gray-800">
      <img
        src={imageUrl}
        alt={`Pixel art of ${prompt}`}
        className="pixelated w-full h-full object-contain rounded-lg bg-gray-700" 
      />
    </div>
  );
};

export default PixelArtDisplay;
