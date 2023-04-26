// SalesHistory.js
import React from "react";
import { getSalesHistory } from "./localStorageHelper";

const SalesHistory = () => {
  const salesHistory = getSalesHistory();

  return (
    <div className="sales-history">
      <h3>Sales History</h3>
      <ul>
        {salesHistory.map((sale, index) => (
          <li key={index}>
            {sale.date} - {sale.items.map((item) => item.name).join(", ")}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SalesHistory;
