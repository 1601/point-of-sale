// Sales.js
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Receipt from "./Receipt";
import { addSale, resetItems } from "./localStorageHelper";

const Sales = () => {
  const [paid, setPaid] = useState(0);
  const items = useSelector((state) => state.items);
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const handleAddItem = (product) => {
    dispatch({ type: "ADD_ITEM", payload: product });
  };

  const handleResetItems = () => {
    dispatch({ type: "RESET_ITEMS" });
  };

  const handlePaidChange = (e) => {
    setPaid(parseFloat(e.target.value));
  };

  const handleCompleteSale = () => {
    if (paid < getTotal()) {
      alert("Paid amount is less than the total amount. Please provide the correct amount.");
      return;
    }

    const sale = {
      date: new Date(),
      items,
      paid,
      total: getTotal(),
      change: paid - getTotal(),
    };

    addSale(sale);
    handleResetItems();
    setPaid(0);
    alert("Sale complete. Thank you!");
  };

  const getTotal = () => {
    return items.reduce((total, item) => {
      const product = products.find((p) => p.id === item.id);
      return total + (item.quantity * product.halfPrice);
    }, 0);
  };

  return (
    <div className="sales">
      <h3>Sales</h3>
      <div className="items">
        {products.map((product) => (
          <button key={product.id} onClick={() => handleAddItem(product)}>
            {product.name} - ₱{product.halfPrice.toLocaleString("en-PH", { minimumFractionDigits: 2 })}
          </button>
        ))}
      </div>
      <Receipt
        items={items}
        paid={paid}
        total={getTotal()}
        change={paid - getTotal()}
      />
      <div className="actions">
        <label>
          Paid:
          <input
            type="number"
            min="0"
            step="0.01"
            value={paid}
            onChange={handlePaidChange}
          />
        </label>
        <button type="button" onClick={handleCompleteSale}>
          Complete Sale
        </button>
      </div>
    </div>
  );
};

export default Sales;
