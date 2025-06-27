import axios from "axios";

const API_BASE_URL = "https://fakestoreapi.com";

export const fetchAllProducts = async () => {
  const response = await axios.get(`${API_BASE_URL}/products`);
  return response.data;
};

export const fetchProductById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/products/${id}`);
  return response.data;
};

export const fetchCategories = async () => {
  const response = await axios.get(`${API_BASE_URL}/products/categories`);
  return response.data;
};

export const fetchProductsByCategory = async (category) => {
  const response = await axios.get(
    `${API_BASE_URL}/products/category/${category}`
  );
  return response.data;
};
