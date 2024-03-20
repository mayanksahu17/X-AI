"use client"
import { useState,KeyboardEvent } from 'react';
export default function Component() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    try {
      if (!prompt.trim()) {
        setError('Please enter a prompt.');
        return;
      }

      setLoading(true);
      setError('');

      const apiUrl = 'https://gemini-server-hsl4.onrender.com/api/v1/generate/res';
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch response');
      }

      const responseData = await response.json();
      setPrompt('');
      setResponse(responseData.generatedContent);
    } catch (error : any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event : KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSubmit();
    }
  };

  const isCodeResponse = response.startsWith('<code>') && response.endsWith('</code>');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
      <BrainIcon className="h-12 w-12 text-gray-500 mb-4" />
      <h1 className="text-2xl md:text-4xl font-bold text-center mb-4">How can I help you today?</h1>
      <div className="w-full mb-4 mt-10">
        <input
          className="w-[40%] ml-[29%] rounded-full bg-gray-800 py-2 px-4 text-white placeholder-gray-500"
          placeholder="Write your prompt..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      <button
        onClick={handleSubmit}
        className="w-[10%] bg-white py-2 px-4 text-black rounded-lg hover:bg-white hover:text-black"
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Submit'}
      </button>
      {error && <p className="mt-4 text-red-500">{error}</p>}
      {response && (
        <div className="mt-4">
          {isCodeResponse ? (
            <pre className="text-gray-500 bg-gray-900 p-4 rounded">{response.slice(6, -7)}</pre>
          ) : (
            <p className="text-gray-500">{response}</p>
          )}
        </div>
      )}
      <p className="mt-4 text-sm text-gray-500 text-center">This can make mistakes. Consider checking important information.</p>
      <span className="mt-8 font-semibold text-lg text-gray-800">Designed and Developed by Mayank Sahu</span>
    </div>
  );
}

function BrainIcon(props : any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
       <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
    </svg>
  );
}
