import {
  ADD_TO_CART,
  CLEAR_FILTER,
  FETCH_PRODUCTS,
  FETCH_PRODUCT_DETAIL,
  REMOVE_FROM_CART,
  SET_FILTERED_PRODUCTS,
  SET_PRODUCTS,
  SET_PRODUCT_DETAIL,
} from "../../types/productTypes";

export const fetchProducts = () => ({ type: FETCH_PRODUCTS });
export const setProducts = (payload) => ({ type: SET_PRODUCTS, payload });

export const fetchProductDetail = (id) => ({ type: FETCH_PRODUCT_DETAIL, id });
export const setProductDetail = (payload) => ({
  type: SET_PRODUCT_DETAIL,
  payload,
});

export const addToCart = (product) => ({ type: ADD_TO_CART, product });
export const removeFromCart = (id) => ({ type: REMOVE_FROM_CART, id });
export const clearFilter = () => ({ type: CLEAR_FILTER });
export const setFilteredProducts = (payload) => ({
  type: SET_FILTERED_PRODUCTS,
  payload,
});
