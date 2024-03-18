"use client";
import { useState } from 'react';
export default function Component() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      if (!prompt.trim()) {
        setError('Please enter a prompt.');
        return;
      }
      console.log("prompt",prompt);
      

      setLoading(true);
      setError("");

      const apiUrl = 'https://gemini-server-hsl4.onrender.com/api/v1/generate';
      // const apiUrl = 'http://localhost:3000/api/v1/generate';
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt  : prompt }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch response');
      }

      const responseData = await response.json();
      console.log(responseData.generatedContent);
      setResponse(responseData.generatedContent);
    } catch (error : any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event : any) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      <BrainIcon className="h-20 w-20 text-gray-500" />
      <h1 className="mt-8 text-4xl font-bold">How can I help you today?</h1>
      <div className="mt-8 grid grid-cols-2 gap-8">
        {/* Your buttons */}
      </div>
      <div className=" text-gray-500 m-4  w-[700px]"> {response}</div>

      <div className='flex items-center mt-8 '>

        <input
          className="w-96 rounded-full bg-gray-800 py-3 px-6 text-white placeholder-gray-500"
          placeholder="Write your Prompt..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={handleSubmit}
          className="bg-white ml-4 py-3 px-6 text-black h-10 rounded-lg hover:bg-white hover:text-black"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Submit'}
        </button>
      </div>
      
      {error && (
        <p className="mt-4 text-red-500">{error}</p>
      )}
      {response && (
        <div className="mt-8">
        
        </div>
      )}
      <p className="mt-4 text-gray-500">This can make mistakes. Consider checking important information.</p>
    </div>
  );
}

function BrainIcon(props: any) {
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
