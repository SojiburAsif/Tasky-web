import React from 'react';

const Loading = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="space-x-4 flex">
        <div className="w-5 h-5 bg-blue-500 rounded-full animate-bounce"></div>
        <div className="w-5 h-5 bg-blue-500 rounded-full animate-bounce200"></div>
        <div className="w-5 h-5 bg-blue-500 rounded-full animate-bounce400"></div>
      </div>
    </div>
  );
};

export default Loading;
