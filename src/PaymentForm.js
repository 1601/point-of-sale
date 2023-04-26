// PaymentForm.js
import React, { useState } from "react";

const PaymentForm = ({ onPaymentSubmit }) => {
  const [amount, setAmount] = useState(0.0);
  const denominations = [1, 5, 10, 20, 50, 100, 200, 500, 1000];

  const handleSubmit = (e) => {
    e.preventDefault();
    onPaymentSubmit(amount);
  };

  const handleDenominationClick = (denomination) => {
    setAmount(amount + denomination);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Payment</h3>
      <div>
        {denominations.map((denomination, index) => (
          <button
            key={index}
            type="button"
            onClick={() => handleDenominationClick(denomination)}
          >
            ₱{denomination}
          </button>
        ))}
      </div>
      <input
        type="number"
        step="0.01"
        value={amount}
        onChange={(e) => setAmount(parseFloat(e.target.value))}
        required
      />
      <button type="submit">Submit Payment</button>
    </form>
  );
};

export default PaymentForm;
