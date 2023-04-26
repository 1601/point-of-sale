// Product.js
import React from "react";
import { useDispatch } from "react-redux";

const Product = ({ product, onRemoveProduct }) => {
  const dispatch = useDispatch();

  return (
    <div className="product">
      <h4>{product.name}</h4>
      <p>
        Full price: {product.fullPrice ? `₱${product.fullPrice.toLocaleString("en-PH", { minimumFractionDigits: 2 })}` : "N/A"}
      </p>
      <button onClick={() => onRemoveProduct(product.id)}>Remove</button>
    </div>
  );
};

export default Product;
