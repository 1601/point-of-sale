// ProductsList.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import AddProduct from "./AddProduct";
import Product from "./Product";

const ProductsList = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const handleAddProduct = (product) => {
    dispatch({ type: "ADD_PRODUCT", payload: product });
  };

  const handleRemoveProduct = (id) => {
    dispatch({ type: "REMOVE_PRODUCT", payload: id });
  };

  return (
    <div className="products-list">
      <h3>Products</h3>
      <AddProduct onAddProduct={handleAddProduct} />
      {products.map((product) => (
        <Product key={product.id} product={product} onRemoveProduct={handleRemoveProduct} />
      ))}
    </div>
  );
};

export default ProductsList;
