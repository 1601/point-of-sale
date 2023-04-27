// SalesHistory.js
import React from "react";
import { getSalesHistory } from "./localStorageHelper";

const SalesHistory = () => {
  const salesHistory = getSalesHistory();

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString();
  };

  const dailyIncome = salesHistory.reduce((income, sale) => {
    const date = formatDate(sale.date);
    income[date] = (income[date] || 0) + sale.total;
    return income;
  }, {});

  return (
    <div className="sales-history">
      <h3>Sales History</h3>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Items</th>
            <th>Total</th>
            <th>Paid</th>
            <th>Change</th>
          </tr>
        </thead>
        <tbody>
          {salesHistory.map((sale, index) => (
            <tr key={index}>
              <td>{formatDate(sale.date)}</td>
              <td>{formatTime(sale.date)}</td>
              <td>{sale.items.map((item) => item.name).join(", ")}</td>
              <td>₱{sale.total.toLocaleString("en-PH", { minimumFractionDigits: 2 })}</td>
              <td>₱{sale.paid.toLocaleString("en-PH", { minimumFractionDigits: 2 })}</td>
              <td>₱{sale.change.toLocaleString("en-PH", { minimumFractionDigits: 2 })}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Daily Income</h3>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Income</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(dailyIncome).map(([date, income]) => (
            <tr key={date}>
              <td>{date}</td>
              <td>₱{income.toLocaleString("en-PH", { minimumFractionDigits: 2 })}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesHistory;
