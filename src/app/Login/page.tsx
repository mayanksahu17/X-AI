


export default function Component() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      <BrainIcon className="h-20 w-20 text-gray-500" />
      <h1 className="mt-8 text-4xl font-bold">How can I help you today?</h1>
      <div className="mt-8 grid grid-cols-2 gap-8">
        <button className="bg-white text-black">
          Explain airplane turbulence to someone who has never flown before
        </button>
        <button className="bg-white text-black">Help me pick a gift for my dad who loves fishing</button>
        <button className="bg-white text-black">
          Brainstorm edge cases for a function with birthdate as input, horoscope as output
        </button>
        <button className="bg-white text-black">
          Recommend activities for a team-building day with remote employees
        </button>
      </div>
      <input
        className="mt-8 w-96 rounded-full bg-gray-800 py-3 px-6 text-white placeholder-gray-500"
        placeholder="Message ChatGPT..."
      />
      <p className="mt-8 text-gray-500">ChatGPT can make mistakes. Consider checking important information.</p>
    </div>
  )
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
  )
}
