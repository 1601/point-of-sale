// App.js
import React, { useState } from "react";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import AddProduct from "./AddProduct";
import Product from "./Product";
import ProductsList from "./ProductsList";
import Sales from "./Sales";
import SalesHistory from "./SalesHistory";

function App() {
  const [tab, setTab] = useState("products");

  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const handleRemoveProduct = (id) => {
    dispatch({ type: "REMOVE_PRODUCT", payload: id });
  };

  return (
    <div className="App">
      <header>
        <button onClick={() => setTab("products")}>Products</button>
        <button onClick={() => setTab("sales")}>Sales</button>
        <button onClick={() => setTab("history")}>History</button>
      </header>
      {tab === "products" && <AddProduct />}
      {tab === "products" && (
        <div className="products-list">
          <h3>Products</h3>
          {products.map((product) => (
            <Product
              key={product.id}
              product={product}
              onRemoveProduct={handleRemoveProduct}
            />
          ))}
        </div>
      )}
      {tab === "sales" && <ProductsList />}
      {tab === "sales" && <Sales />}
      {tab === "history" && <SalesHistory />}
    </div>
  );
}

export default App;
