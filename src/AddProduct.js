// AddProduct.js
import React, { useState } from "react";

const AddProduct = ({ onAddProduct }) => {
  const [name, setName] = useState("");
  const [fullPrice, setFullPrice] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || fullPrice <= 0) {
      alert("Please provide a valid product name and full price.");
      return;
    }

    onAddProduct({
      id: Date.now(),
      name,
      fullPrice,
      halfPrice: fullPrice / 2,
    });

    setName("");
    setFullPrice(0);
  };

  const denominations = [1, 5, 10, 20, 50, 100, 500, 1000];

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Product Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label>
        Full Price:
        <input
          type="number"
          value={fullPrice}
          onChange={(e) => setFullPrice(parseFloat(e.target.value))}
          required
        />
      </label>
      <div className="denominations">
        {denominations.map((denomination) => (
          <button
            key={denomination}
            type="button"
            onClick={() => setFullPrice(fullPrice + denomination)}
          >
            +₱{denomination}
          </button>
        ))}
      </div>
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProduct;
