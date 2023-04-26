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
      <p>
        Half price: {product.halfPrice ? `₱${product.halfPrice.toLocaleString("en-PH", { minimumFractionDigits: 2 })}` : "N/A"}
      </p>
      <button onClick={() => dispatch({ type: "ADD_ITEM", payload: product })}>
        Add to Sale
      </button>
      <button onClick={() => onRemoveProduct(product.id)}>Remove</button>
    </div>
  );
};

export default Product;
