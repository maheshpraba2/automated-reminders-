// pages/test.js
import { useState } from 'react';

export default function TestPage() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Clear previous error and success messages
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/reminders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, date, description }),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess('Reminder set successfully!');
        // Optionally clear the form
        setTitle('');
        setDate('');
        setDescription('');
      } else {
        setError(result.error || 'Failed to set reminder');
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error('Error:', err);
    }
  };

  return (
    <div>
      <h1>Submit a Reminder</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {success && <p style={{ color: 'green' }}>{success}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
