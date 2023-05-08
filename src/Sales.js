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

  const denominations = [1, 5, 10, 20, 50, 100, 200, 500, 1000];

  const handleAddItem = (product, priceType) => {
    dispatch({ type: "ADD_ITEM", payload: { ...product, priceType } });
  };

  const handleResetItems = () => {
    dispatch({ type: "RESET_ITEMS" });
  };

  const handlePaidChange = (value) => {
    setPaid((prevPaid) => prevPaid + value);
  };

  const handleResetPaid = () => {
    setPaid(0);
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
      console.log(item)
      const product = products.find((p) => p.id === item.id);
      const price = item.priceType === "full" ? product.fullPrice : product.halfPrice;
      return total + price * item.quantity;
    }, 0);
  };
  

  return (
    <div className="sales">
      <h3>Sales</h3>
      <div className="items">
        {products.map((product) => (
          <React.Fragment key={product.id}>
            <div style={{border : "1px solid black"}}>
              <h1>{product.name} </h1>
              <button onClick={() => handleAddItem(product, "full")}>
               (Full) - ₱{product.fullPrice.toLocaleString("en-PH", { minimumFractionDigits: 2 })}
              </button>
              <button onClick={() => handleAddItem(product, "half")}>
               (Half) - ₱{product.halfPrice.toLocaleString("en-PH", { minimumFractionDigits: 2 })}
              </button>
            </div>
          </React.Fragment>
        ))}
      </div>
      <Receipt
        items={items}
        paid={paid}
        total={getTotal()}
        change={paid - getTotal()}
      />
      <div className="actions">
        <div>
          {denominations.map((denomination) => (
            <button key={denomination} onClick={() => handlePaidChange(denomination)}>
              +₱{denomination}
            </button>
          ))}
        </div>
        <label>
          Paid: ₱{paid.toLocaleString("en-PH", { minimumFractionDigits: 2 })}
        </label>
        <button type="button" onClick={handleResetPaid}>
          Reset
        </button>
        <button type="button" onClick={handleResetItems}>
          Reset All
        </button>
        <br/>
        <button type="button" onClick={handleCompleteSale}>
          Complete Sale
        </button>
      </div>
    </div>
  );
};

export default Sales;
