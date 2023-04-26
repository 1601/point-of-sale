//localStorageHelper.js

const LOCAL_STORAGE_KEY = 'products';
const STORE_NAME_KEY = "store_name";
const DEFAULT_STORE_NAME = "Your Store Name";

export function saveProducts(products) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(products));
}

export function loadProducts() {
  const productsJson = localStorage.getItem(LOCAL_STORAGE_KEY);
  return productsJson ? JSON.parse(productsJson) : [];
}

const SALES_HISTORY_KEY = "sales_history";

export const addSale = (sale) => {
  let salesHistory = JSON.parse(localStorage.getItem(SALES_HISTORY_KEY) || "[]");
  salesHistory.push(sale);
  localStorage.setItem(SALES_HISTORY_KEY, JSON.stringify(salesHistory));
};

export const getSalesHistory = () => {
  return JSON.parse(localStorage.getItem(SALES_HISTORY_KEY) || "[]");
};

// Add these new functions to save and load the store name
export function saveStoreName(storeName) {
  localStorage.setItem(STORE_NAME_KEY, storeName);
}

export function loadStoreName() {
  return localStorage.getItem(STORE_NAME_KEY) || DEFAULT_STORE_NAME;
}
