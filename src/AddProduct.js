// AddProduct.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { nanoid } from "nanoid";

const AddProduct = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [fullPrice, setFullPrice] = useState(0);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleFullPriceChange = (e) => {
    setFullPrice(parseFloat(e.target.value));
  };

  const handleAddProduct = (e) => {
    e.preventDefault();

    const newProduct = {
      id: nanoid(),
      name,
      fullPrice,
    };

    dispatch({ type: "ADD_PRODUCT", payload: newProduct });

    setName("");
    setFullPrice(0);
  };

  const handleDenominationClick = (amount) => {
    setFullPrice((prevPrice) => prevPrice + amount);
  };

  return (
    <div className="add-product">
      <h3>Add Product</h3>
      <form onSubmit={handleAddProduct}>
        <label>
          Name:
          <input type="text" value={name} onChange={handleNameChange} />
        </label>
        <label>
          Full Price (PHP):
          <div className="denominations">
            <button onClick={() => handleDenominationClick(10)}>₱10</button>
            <button onClick={() => handleDenominationClick(20)}>₱20</button>
            <button onClick={() => handleDenominationClick(50)}>₱50</button>
            <button onClick={() => handleDenominationClick(100)}>₱100</button>
            <button onClick={() => handleDenominationClick(200)}>₱200</button>
            <button onClick={() => handleDenominationClick(500)}>₱500</button>
          </div>
          <input
            type="number"
            min="0"
            step="0.01"
            value={fullPrice}
            onChange={handleFullPriceChange}
          />
        </label>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
