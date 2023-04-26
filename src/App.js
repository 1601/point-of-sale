// // App.js
// import React, { useState } from "react";
// import AddProductForm from "./AddProductForm";
// import ProductsList from "./ProductsList";
// import PaymentForm from "./PaymentForm";
// import Receipt from "./Receipt";
// import TabNavigation from "./TabNavigation";
// import { useSelector, useDispatch } from "react-redux";
// import { addSale } from "./localStorageHelper";
// import SalesHistory from "./SalesHistory";

// function App() {
//   const [activeTab, setActiveTab] = useState("Products");
//   const items = useSelector((state) => state.items);
//   const paid = useSelector((state) => state.paid);
//   const total = useSelector((state) => state.total);
//   const change = useSelector((state) => state.change);
//   const dispatch = useDispatch();

//   const handlePaymentSubmit = (amount) => {
//     if (total <= amount) {
//       addSale(items);
//       dispatch({ type: "PROCESS_PAYMENT", payload: amount });
//     } else {
//       alert("Amount paid is not enough.");
//     }
//   };

//   const tabsContent = {
//     Products: (
//       <>
//         <AddProductForm />
//         <ProductsList />
//       </>
//     ),
//     Sales: (
//       <>
//         <PaymentForm onPaymentSubmit={handlePaymentSubmit} />
//         <Receipt items={items} paid={paid} total={total} change={change} />
//       </>
//     ),
//     History: <SalesHistory />,
//   };

//   return (
//     <div className="App">
//       <TabNavigation
//         tabs={["Products", "Sales", "History"]}
//         activeTab={activeTab}
//         setActiveTab={setActiveTab}
//       />
//       {tabsContent[activeTab]}
//     </div>
//   );
// }

// export default App;
// App.js
import React, { useState } from "react";
import "./App.css";
import AddProduct from "./AddProduct";
import Product from "./Product";
import ProductsList from "./ProductsList";
import Sales from "./Sales";
import SalesHistory from "./SalesHistory";

function App() {
  const [tab, setTab] = useState("products");

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
