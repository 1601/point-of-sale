//localStorageHelper.js

const LOCAL_STORAGE_KEY = 'products';

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