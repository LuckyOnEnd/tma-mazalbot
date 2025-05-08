import React, { useState } from 'react';
import axios from 'axios';

const AIPrompt = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleQuerySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await axios.post('/api/openai', { query });
      setResponse(result.data.response);
    } catch (error) {
      console.error('Error fetching AI response:', error);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-semibold">AI Chat Component</h2>
      <form onSubmit={handleQuerySubmit} className="space-y-2">
        <input
          type="text"
          value={query}
          onChange={handleQueryChange}
          className="w-full p-2 border rounded"
          placeholder="Ask a question about your stock..."
        />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          Submit
        </button>
      </form>
      {response && (
        <div className="mt-4 p-4 border rounded bg-gray-100">
          <h3 className="text-lg font-medium">AI Response:</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default AIPrompt;
