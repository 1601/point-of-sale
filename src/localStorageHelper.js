const LOCAL_STORAGE_KEY = 'products';

export function saveProducts(products) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(products));
}

export function loadProducts() {
  const productsJson = localStorage.getItem(LOCAL_STORAGE_KEY);
  return productsJson ? JSON.parse(productsJson) : [];
}

// localStorageHelper.js
// ...
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