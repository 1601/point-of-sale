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
