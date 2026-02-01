import api from './axios';

// GET products
const getAllProducts = async (
  page = 1,
  search = "",
  category_id = ""
) => {
  const res = await api.get('/products', {
    params: { page, search, category_id }
  });
  return res.data;
};

// GET single product
const getProductDetails = async (id) => {
  const res = await api.get(`/products/${id}`);
  return res.data;
};

// CREATE product
const createProduct = async (data) => {
  const res = await api.post('/products', data);
  return res.data;
};

// UPDATE product
const updateProduct = async (id, data) => {
  const res = await api.put(`/products/${id}`, data);
  return res.data;
};

// DELETE product
const deleteProduct = async (id) => {
  const res = await api.delete(`/products/${id}`);
  return res.data;
};

// STOCK IN
const stockIn = async (productId, quantity) => {
  try {
    const res = await api.post(
      `/products/${productId}/stock-in`,
      { quantity }
    );
    return res.data;
  } catch (error) {
    console.error("Error in stock in:", error);
    throw error.response?.data || error;
  }
};

// STOCK OUT
const stockOut = async (productId, quantity) => {
  try {
    const res = await api.post(
      `/products/${productId}/stock-out`,
      { quantity }
    );
    return res.data;
  } catch (error) {
    console.error("Error in stock out:", error);
    throw error.response?.data || error;
  }
};

export {
  getAllProducts,
  getProductDetails,
  createProduct,
  updateProduct,
  deleteProduct,
  stockIn,
  stockOut
};
