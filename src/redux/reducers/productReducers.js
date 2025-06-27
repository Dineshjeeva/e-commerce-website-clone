import {
  ADD_TO_CART,
  CLEAR_FILTER,
  REMOVE_FROM_CART,
  SET_FILTERED_PRODUCTS,
  SET_PRODUCTS,
  SET_PRODUCT_DETAIL,
} from "../../types/productTypes";

const initialState = {
  productList: [],
  filteredProducts: [],
  productDetail: null,
  cart: [],
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        ...state,
        productList: action.payload,
        filteredProducts: action.payload,
      };
    case SET_FILTERED_PRODUCTS:
      return {
        ...state,
        filteredProducts: action.payload,
      };
    case SET_PRODUCT_DETAIL:
      return { ...state, productDetail: action.payload };
    case ADD_TO_CART:
      return { ...state, cart: [...state.cart, action.product] };
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.id),
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filteredProducts: state.productList,
      };

    default:
      return state;
  }
};
