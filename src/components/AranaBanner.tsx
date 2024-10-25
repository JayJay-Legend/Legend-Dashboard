import React from 'react';

function AranaBanner() {
  return (
    <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-lg rounded-lg p-6 mb-8 border border-white/10">
      <h2 className="text-2xl font-bold text-white mb-2">Discover Arana AI</h2>
      <p className="text-white/80 mb-4">
        Experience the next generation of AI assistance with Arana - your intelligent companion for seamless productivity.
      </p>
      <a
        href="https://arana-ia.netlify.app"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
      >
        Visit Arana
      </a>
    </div>
  );
}

export default AranaBanner;