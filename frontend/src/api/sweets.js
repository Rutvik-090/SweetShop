import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// Add a new sweet
export const addSweet = async (sweetData) => {
  console.log(BASE_URL);
  const res = await axios.post(`${BASE_URL}/sweets/create`, sweetData);
  return res.data;
};

// Get all sweets
export const getAllSweets = async (queryParams = "") => {
  const url = queryParams
    ? `${BASE_URL}/sweets/view?${queryParams}`
    : `${BASE_URL}/sweets/view`;

  const res = await axios.get(url);
  return res.data.sweets;
};

// Delete a sweet by ID
export const deleteSweet = async (id) => {
  const res = await axios.delete(`${BASE_URL}/sweets/delete/${id}`);
  return res.data;
};

// Purchase a sweet (decrease quantity)
export const purchaseSweet = async (id, quantity) => {
  const res = await axios.put(`${BASE_URL}/sweets/purchase/${id}`, {
    quantity,
  });
  return res.data;
};

// Restock a sweet (increase quantity)
export const restockSweet = async (id, quantity) => {
  const res = await axios.put(`${BASE_URL}/sweets/restock/${id}`, {
    quantity,
  });
  return res.data;
};
