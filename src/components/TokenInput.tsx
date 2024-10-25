import React, { useState } from 'react';

interface TokenInputProps {
  onSubmit: (token: string) => void;
}

function TokenInput({ onSubmit }: TokenInputProps) {
  const [token, setToken] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (token.trim()) {
      onSubmit(token.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="relative">
        <input
          type="password"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Enter your bot token"
          className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
        >
          Connect
        </button>
      </div>
    </form>
  );
}

export default TokenInput;