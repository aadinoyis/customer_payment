import React, { useState } from 'react';

const TransactionForm = () => {
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestBody = { email, amount: parseInt(amount) * 100, currency: 'NGN' };
    try {
      const response = await fetch('https://customer-service-96ao.onrender.com/api/initiateTransaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ error: error.message });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Amount:
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </label>

        <button type="submit">Submit</button>
      </form>

      {result && (
        <div>
          {result.error ? (
            <p>Error: {result.error}</p>
          ) : (
            <a href={`${result}`}>Click here to proceed!</a>
            
          )}
        </div>
      )}
    </div>
  );
};

export default TransactionForm;
