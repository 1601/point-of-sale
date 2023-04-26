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
    case "LOAD_PRODUCTS":
      return action.payload;
    default:
      return state;
  }
}

function items(state = initialState.items, action) {
  switch (action.type) {
    case "ADD_ITEM":
      const existingItemIndex = state.findIndex((item) => item.id === action.payload.id);

      if (existingItemIndex !== -1) {
        const newState = [...state];
        newState[existingItemIndex].quantity += 1;
        return newState;
      } else {
        return [...state, { ...action.payload, quantity: 1 }];
      }
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
