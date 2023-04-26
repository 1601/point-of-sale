
//App.js
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import AddProduct from "./AddProduct";
import Product from "./Product";
import Sales from "./Sales";
import SalesHistory from "./SalesHistory";
import { loadProducts, saveProducts } from "./localStorageHelper"; // import the functions

function App() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const [tab, setTab] = useState("products");
  
  React.useEffect(() => {
    loadProducts();
  }, []);
  

  // Load the products from localStorage on app startup
  React.useEffect(() => {
    const savedProducts = loadProducts();
    if (savedProducts.length > 0) {
      dispatch({ type: "SET_PRODUCTS", payload: savedProducts });
    }
  }, [dispatch]);

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
        <h1>Point of Sale</h1>
      </header>
      <div className="tabs">
        <button className={tab === "products" ? "active" : ""} onClick={() => handleTabSelect("products")}>
          Products
        </button>
        <button className={tab === "sales" ? "active" : ""} onClick={() => handleTabSelect("sales")}>
          Sales
        </button>
        <button className={tab === "history" ? "active" : ""} onClick={() => handleTabSelect("history")}>
          SalesHistory
        </button>
      </div>
      <div className="tab-content">
        {tab === "products" && (
          <>
            {/* <AddProduct onAddProduct={handleAddProduct} />  */}
            <AddProduct />
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
