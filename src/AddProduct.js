// AddProduct.js
import React, { useState } from "react";
import { nanoid } from "nanoid";

const AddProduct = ({ onAddProduct }) => {
  const [name, setName] = useState("");
  const [fullPrice, setFullPrice] = useState(0);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (fullPrice === 0) {
      return;
    }

    const newProduct = {
      id: nanoid(),
      name,
      fullPrice,
      halfPrice: fullPrice / 2,
    };

    onAddProduct(newProduct);

    setName("");
    setFullPrice(0);
  };

  const denominations = [1, 5, 10, 20, 50, 100, 200, 500, 1000];
  const handleDenominationClick = (denomination) => {
    setFullPrice((prevPrice) => prevPrice + denomination);
  };

  return (
    <div className="add-product">
      <h3>Add Product</h3>
      <form onSubmit={handleFormSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={handleNameChange} />
        </label>
        <label>
          Full Price (PHP):
          <div className="denominations">
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
            min="0"
            step="0.01"
            value={fullPrice}
            onChange={(e) => setFullPrice(parseFloat(e.target.value))}
          />
        </label>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
