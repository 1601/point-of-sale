
//App.js
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import AddProduct from "./AddProduct";
import Product from "./Product";
import Sales from "./Sales";
import SalesHistory from "./SalesHistory";
import { loadProducts, saveProducts, loadStoreName, saveStoreName } from "./localStorageHelper";

function App() {
  const dispatch = useDispatch();
  const products = loadProducts();
  const [tab, setTab] = useState("products");

  // Add store name state and load it from localStorage
  const [storeName, setStoreName] = useState(loadStoreName());
  const [editingStoreName, setEditingStoreName] = useState(false);

  // Handle changing the store name
  const handleStoreNameChange = (event) => {
    const newStoreName = event.target.value;
    setStoreName(newStoreName);
    saveStoreName(newStoreName);
  };

  // Toggle editing store name
  const toggleEditingStoreName = () => {
    setEditingStoreName(!editingStoreName);
  };


  // Handle adding a new product
  const handleAddProduct = (newProduct) => {
    dispatch({ type: "ADD_PRODUCT", payload: newProduct });

    // Save the updated products list to localStorage
    const updatedProducts = [...products, newProduct];
    saveProducts(updatedProducts);
  };

  // Handle removing a product
  const handleRemoveProduct = (productId) => {
    dispatch({ type: "REMOVE_PRODUCT", payload: productId });

    // Save the updated products list to localStorage
    const updatedProducts = products.filter((product) => product.id !== productId);
    saveProducts(updatedProducts);
  };

  // Handle selecting a tab
  const handleTabSelect = (tabName) => {
    setTab(tabName);
  };

  return (
    <div className="App">
      <header className="App-header">
        {editingStoreName ? (
          <>
            <input
              type="text"
              value={storeName}
              onChange={handleStoreNameChange}
              className="store-name-input"
              onBlur={toggleEditingStoreName}
            />
            <button onClick={toggleEditingStoreName}>Done</button>
          </>
        ) : (
          <>
            <h1>{storeName} <button onClick={toggleEditingStoreName}>Edit</button></h1>
            
          </>
        )}
      </header>
      <div className="tabs">
        <button className={tab === "products" ? "active" : ""} onClick={() => handleTabSelect("products")}>
          Products
        </button>
        <button className={tab === "sales" ? "active" : ""} onClick={() => handleTabSelect("sales")}>
          Sales
        </button>
        <button className={tab === "history" ? "active" : ""} onClick={() => handleTabSelect("history")}>
          History
        </button>
      </div>
      <div className="tab-content">
      {tab === "products" && (
        <>
          <AddProduct onAddProduct={handleAddProduct} />
          {products.map((product) => (
            <Product key={product.id} product={product} onRemoveProduct={handleRemoveProduct} />
          ))}
        </>
      )}
        {tab === "sales" && <Sales />}
        {tab === "history" && <SalesHistory />}
      </div>
    </div>
  );
}

export default App;
