// Receipt.js
import React from "react";

const Receipt = ({ items, paid, total, change }) => {
  if (!items || items.length === 0) {
    return (
      <div className="receipt">
        <h3>Receipt</h3>
        <p>No items added yet.</p>
      </div>
    );
  }

  return (
    <div className="receipt">
      <h3>Receipt</h3>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.name} - ₱{item.halfPrice.toLocaleString("en-PH", { minimumFractionDigits: 2 })}
          </li>
        ))}
      </ul>
      <p>Total: ₱{total.toLocaleString("en-PH", { minimumFractionDigits: 2 })}</p>
      <p>Paid: ₱{paid.toLocaleString("en-PH", { minimumFractionDigits: 2 })}</p>
      <p>Change: ₱{change.toLocaleString("en-PH", { minimumFractionDigits: 2 })}</p>
    </div>
  );
};

export default Receipt;
