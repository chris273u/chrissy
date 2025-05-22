
import React, { useState, useCallback } from 'react';
import { generatePixelArt } from './services/geminiService';
import LoadingSpinner from './components/LoadingSpinner';
import PixelArtDisplay from './components/PixelArtDisplay';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [submittedPrompt, setSubmittedPrompt] = useState<string>('');

  const handleSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!prompt.trim()) {
      setError('Please enter a prompt.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);
    setSubmittedPrompt(prompt); // Store the prompt used for generation

    try {
      const imageDataUrl = await generatePixelArt(prompt);
      setGeneratedImage(imageDataUrl);
    } catch (err) {
      console.error('Error generating image:', err);
      if (err instanceof Error) {
        setError(`Failed to generate image: ${err.message}. Check if API key is configured.`);
      } else {
        setError('An unknown error occurred while generating the image.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [prompt]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-purple-900 flex flex-col items-center py-8 px-4 selection:bg-purple-500 selection:text-white">
      <header className="mb-10 text-center">
        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-2">
          Pixel Art Genie
        </h1>
        <p className="text-lg text-gray-300">
          Transform your ideas into stunning pixel art with AI.
        </p>
      </header>

      <main className="w-full max-w-2xl">
        <form onSubmit={handleSubmit} className="mb-8 p-6 bg-gray-800 bg-opacity-70 backdrop-blur-md rounded-xl shadow-2xl border border-gray-700">
          <div className="mb-6">
            <label htmlFor="prompt" className="block mb-2 text-sm font-medium text-purple-300">
              Enter your vision:
            </label>
            <textarea
              id="prompt"
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., a knight battling a dragon, a serene forest scene, a futuristic city..."
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200"
              disabled={isLoading}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading || !prompt.trim()}
            className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100"
          >
            {isLoading ? 'Conjuring Pixels...' : 'Generate Pixel Art'}
          </button>
        </form>

        {isLoading && (
          <div className="my-8 flex justify-center">
            <LoadingSpinner />
          </div>
        )}

        {error && (
          <div className="my-8 p-4 bg-red-800 bg-opacity-80 text-red-100 rounded-lg shadow-lg border border-red-700 text-center">
            <p className="font-semibold">Oops! Something went wrong.</p>
            <p>{error}</p>
          </div>
        )}

        {generatedImage && !isLoading && (
          <div className="my-8 flex flex-col items-center">
             <h2 className="text-2xl font-semibold text-gray-200 mb-4">Your Pixel Masterpiece:</h2>
            <PixelArtDisplay imageUrl={generatedImage} prompt={submittedPrompt} />
          </div>
        )}

        {!generatedImage && !isLoading && !error && (
            <div className="my-8 flex flex-col items-center">
                 <PixelArtDisplay imageUrl={null} prompt="Placeholder" />
            </div>
        )}
      </main>
      
      <footer className="mt-12 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Pixel Art Genie. Powered by Google Gemini & Imagen.</p>
      </footer>
    </div>
  );
};

export default App;
