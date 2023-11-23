import React, { useState } from 'react';

const TransactionForm = () => {
  const [email, setEmail] = useState('hey.gobskt@gmail.com');
  const [amount, setAmount] = useState('1000000');
  const [currency, setCurrency] = useState('NGN');
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestBody = { email, amount, currency };
    try {
      const response = await fetch('http://localhost:8080/api/initiateTransaction', {
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
        <br />
        <label>
          Currency:
          <input
            type="text"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            required
          />
        </label>
        <br />
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
