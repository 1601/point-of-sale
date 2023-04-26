//AddProductForm.js
import React, { useState } from 'react';

const AddProductForm = ({ onAddProduct }) => {
  const [name, setName] = useState('');
  const [fullPrice, setFullPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !fullPrice) return;

    const halfPrice = parseFloat(fullPrice) / 2;
    onAddProduct({ name, fullPrice: parseFloat(fullPrice), halfPrice });

    // Reset form fields
    setName('');
    setFullPrice('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        step="0.01"
        placeholder="Full Price"
        value={fullPrice}
        onChange={(e) => setFullPrice(e.target.value)}
      />
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProductForm;
