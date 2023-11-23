import React, { useState } from 'react';

const TransactionHistory = () => {
  const [email, setEmail] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/getCustomerTransaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const {data} = await response.json();
      console.log(data)
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
            placeholder='Enter your email address'
          />
        </label>
        <button type="submit">Submit</button>
      </form>

      {result && (
        <div>
          {result.error ? (
            <p>Error: {result.error}</p>
          ) : (
            <div>
              <p>Transactions:</p>

              <ul>
                {result.map((transaction) => (
                  <li key={transaction.id} style={{marginBottom: '2rem'}}>
                    <h3>Amount: {transaction.amount}</h3>
                    <h3>First Name: {transaction.customer.first_name}</h3>
                    <h3>Email: {transaction.customer.email}</h3>
                    <h3>Status: {transaction.status}</h3>
                    <h3>Reference: {transaction.reference}</h3>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;
