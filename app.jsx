import { useState } from 'react';
import './index.css';

// 👉 point to your live backend URL
const API_BASE = 'https://resume-backend-6dsy.onrender.com';

export default function App() {
  const [resume, setResume] = useState('');
  const [suggestions, setSuggestions] = useState('');
  const [loading, setLoading] = useState(false);

  const getSuggestions = async () => {
    if (!resume.trim()) return alert('Please paste your resume first.');

    setLoading(true);
    setSuggestions('');

    try {
      const res = await fetch(`${API_BASE}/api/suggest`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeText: resume }),
      });
      const data = await res.json();
      setSuggestions(data.suggestions || 'No suggestions returned.');
    } catch (err) {
      console.error(err);
      setSuggestions('Failed to fetch suggestions.');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Smart Resume Builder</h1>
      <textarea
        className="w-full border rounded p-3 h-56 mb-4"
        placeholder="Paste your resume here..."
        value={resume}
        onChange={e => setResume(e.target.value)}
      />
      <button
        onClick={getSuggestions}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        {loading ? 'Loading...' : 'Get AI Suggestions'}
      </button>

      {suggestions && (
        <div className="mt-6 bg-white p-4 rounded shadow max-w-4xl mx-auto">
          <h2 className="text-xl font-semibold mb-2">Suggestions</h2>
          <pre className="whitespace-pre-wrap text-sm">{suggestions}</pre>
        </div>
      )}
    </div>
  );
}
