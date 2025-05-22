import React from 'react';

const Loading = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="flex space-x-4 group">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`
              w-6 h-6 rounded-full transition-all duration-300 ease-in-out
              ${i % 2 === 0 ? 'bg-purple-600 animate-bounce' : 'bg-purple-800 animate-ping'}
              group-hover:scale-125 group-hover:rotate-12 group-hover:bg-fuchsia-500
            `}
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  );
};

export default Loading;
