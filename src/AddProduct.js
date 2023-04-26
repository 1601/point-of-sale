// AddProduct.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { nanoid } from "nanoid";
import { loadProducts, saveProducts } from "./localStorageHelper";


const AddProduct = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [fullPrice, setFullPrice] = useState(0);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAddProduct = (e) => {
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
  
    dispatch({ type: "ADD_PRODUCT", payload: newProduct });
  
    // Save the updated products list to localStorage
    const products = loadProducts();
    products.push(newProduct);
    saveProducts(products);
  
    setName("");
    setFullPrice(0);
  };

  const denominations = [10, 20, 50, 100, 200, 500, 1000];
  const handleDenominationClick = (denomination) => {
    setFullPrice((prevPrice) => prevPrice + denomination);
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
