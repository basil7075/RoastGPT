import React, { useState } from 'react';
import axios from 'axios';
import './RoastBox.css';

function RoastBox() {
  const [input, setInput] = useState('');
  const [roast, setRoast] = useState('');
  const [support, setSupport] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setRoast('');
    setSupport('');

    try {
      const res = await axios.post(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          model: 'mixtral-8x7b-32768', // or whichever Groq model you choose
          messages: [
            {
              role: 'system',
              content: 'You are RoastGPT. For any user input, first give a short, funny roast, then give an emotional support line. Format output as:\nROAST: <roast>\nSUPPORT: <support message>'
            },
            {
              role: 'user',
              content: input
            }
          ],
          max_tokens: 150
        },
        {
          headers: {
            'Authorization': `Bearer ${process.env.REACT_APP_GROQ_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const output = res.data.choices[0].message.content;
      const roastMatch = output.match(/ROAST:\s*(.*)/i);
      const supportMatch = output.match(/SUPPORT:\s*(.*)/i);

      setRoast(roastMatch ? roastMatch[1] : 'No roast found ');
      setSupport(supportMatch ? supportMatch[1] : 'No support found ');

    } catch (err) {
      console.error(err);
      setError('Something went wrong. Check your API key or network.');
    }

    setLoading(false);
  };

  return (
    <div className="roast-box">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type how you feel today..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" disabled={loading || !input}>
          {loading ? 'Thinking...' : 'Roast me'}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      {roast && (
        <div className="roast-response">
          <p><strong> Roast:</strong> {roast}</p>
          <p className="support-message"><strong> Support:</strong> {support}</p>
        </div>
      )}
    </div>
  );
}

export default RoastBox;