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
// App.test.js
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// Register the service worker
serviceWorkerRegistration.register();

reportWebVitals();
//localStorageHelper.js

const LOCAL_STORAGE_KEY = 'products';

export function saveProducts(products) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(products));
}

export function loadProducts() {
  const productsJson = localStorage.getItem(LOCAL_STORAGE_KEY);
  return productsJson ? JSON.parse(productsJson) : [];
}

export function getSalesHistory() {
  const salesHistory = localStorage.getItem("salesHistory");
  return salesHistory ? JSON.parse(salesHistory) : [];
}

export function addSale(items) {
  const salesHistory = getSalesHistory();
  const sale = {
    date: new Date().toLocaleString(),
    items: [...items],
  };

  salesHistory.push(sale);
  localStorage.setItem("salesHistory", JSON.stringify(salesHistory));
}
// PaymentForm.js
import React, { useState } from "react";

const PaymentForm = ({ onPaymentSubmit }) => {
  const [amount, setAmount] = useState(0);
  const denominations = [1, 5, 10, 20, 50, 100, 200, 500, 1000];

  const handleSubmit = (e) => {
    e.preventDefault();
    onPaymentSubmit(amount);
  };

  const handleDenominationClick = (denomination) => {
    setAmount(amount + denomination);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Payment</h3>
      <div>
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
        step="0.01"
        value={amount}
        onChange={(e) => setAmount(parseFloat(e.target.value))}
        required
      />
      <button type="submit">Submit Payment</button>
    </form>
  );
};

export default PaymentForm;
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
// Receipt.js
import React from "react";

const Receipt = ({ items, paid, total, change }) => {
  if (!items || items.length === 0) {
    return (
      <div className="receipt">
        <h3>Receipt</h3>
        <p>No items added yet.</p>
      </div>
    );
  }

  return (
    <div className="receipt">
      <h3>Receipt</h3>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.name} - ₱{item.halfPrice.toLocaleString("en-PH", { minimumFractionDigits: 2 })}
          </li>
        ))}
      </ul>
      <p>Total: ₱{total.toLocaleString("en-PH", { minimumFractionDigits: 2 })}</p>
      <p>Paid: ₱{paid.toLocaleString("en-PH", { minimumFractionDigits: 2 })}</p>
      <p>Change: ₱{change.toLocaleString("en-PH", { minimumFractionDigits: 2 })}</p>
    </div>
  );
};

export default Receipt;
//reportWebVitals.js is a file that is used to report different web vitals to Google Analytics.
const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
// Sales.js
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Receipt from "./Receipt";
import { addSale, resetItems } from "./localStorageHelper";

const Sales = () => {
  const [paid, setPaid] = useState(0);
  const items = useSelector((state) => state.items);
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const handleAddItem = (product) => {
    dispatch({ type: "ADD_ITEM", payload: product });
  };

  const handleResetItems = () => {
    dispatch({ type: "RESET_ITEMS" });
  };

  const handlePaidChange = (e) => {
    setPaid(parseFloat(e.target.value));
  };

  const handleCompleteSale = () => {
    if (paid < getTotal()) {
      alert("Paid amount is less than the total amount. Please provide the correct amount.");
      return;
    }

    const sale = {
      date: new Date(),
      items,
      paid,
      total: getTotal(),
      change: paid - getTotal(),
    };

    addSale(sale);
    handleResetItems();
    setPaid(0);
    alert("Sale complete. Thank you!");
  };

  const getTotal = () => {
    return items.reduce((total, item) => {
      const product = products.find((p) => p.id === item.id);
      return total + (item.quantity * product.halfPrice);
    }, 0);
  };

  return (
    <div className="sales">
      <h3>Sales</h3>
      <div className="items">
        {products.map((product) => (
          <button key={product.id} onClick={() => handleAddItem(product)}>
            {product.name} - ₱{product.halfPrice.toLocaleString("en-PH", { minimumFractionDigits: 2 })}
          </button>
        ))}
      </div>
      <Receipt
        items={items}
        paid={paid}
        total={getTotal()}
        change={paid - getTotal()}
      />
      <div className="actions">
        <label>
          Paid:
          <input
            type="number"
            min="0"
            step="0.01"
            value={paid}
            onChange={handlePaidChange}
          />
        </label>
        <button type="button" onClick={handleCompleteSale}>
          Complete Sale
        </button>
      </div>
    </div>
  );
};

export default Sales;
// SalesHistory.js
import React from "react";
import { getSalesHistory } from "./localStorageHelper";

const SalesHistory = () => {
  const salesHistory = getSalesHistory();

  return (
    <div className="sales-history">
      <h3>Sales History</h3>
      <ul>
        {salesHistory.map((sale, index) => (
          <li key={index}>
            {sale.date} - {sale.items.map((item) => item.name).join(", ")}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SalesHistory;
// src/serviceWorkerRegistration.js
export function register() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/service-worker.js')
          .then((registration) => {
            console.log('Service Worker registered: ', registration);
          })
          .catch((registrationError) => {
            console.log('Service Worker registration failed: ', registrationError);
          });
      });
    }
  }
  
  export function unregister() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready
        .then((registration) => {
          registration.unregister();
        })
        .catch((error) => {
          console.error('Error during service worker unregistration:', error);
        });
    }
  }
  
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
//store.js
import { createStore } from "redux";
import rootReducer from "./reducers";

const store = createStore(rootReducer);

export default store;
// TabNavigation.js
import React from "react";

const TabNavigation = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="tab-navigation">
      {tabs.map((tab, index) => (
        <button
          key={index}
          className={activeTab === tab ? "active-tab" : ""}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;

//src\reducers\index.js
import { combineReducers } from "redux";

const initialState = {
  products: [],
  items: [],
};

function products(state = initialState.products, action) {
  switch (action.type) {
    case "ADD_PRODUCT":
      return [...state, action.payload];
    case "REMOVE_PRODUCT":
      return state.filter((product) => product.id !== action.payload);
    default:
      return state;
  }
}

function items(state = initialState.items, action) {
  switch (action.type) {
    case "ADD_ITEM":
      return [...state, action.payload];
    case "RESET_ITEMS":
      return initialState.items;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  products,
  items,
});

export default rootReducer;

