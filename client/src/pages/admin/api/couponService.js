import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL: 'http://localhost:4400/coupons',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Error handler helper
const handleError = (error, operation) => {
  console.error(`Error ${operation}:`, error?.response?.data || error.message);
  throw error;
};

const couponService = {
  getAllcoupons: async () => {
    try {
      const { data } = await api.get('/');
      console.log(data);
      
      return data;
    } catch (error) {
      handleError(error, 'fetching coupons');
    }
  },

  createcoupon: async (couponData) => {
    try {
      console.log("coupon Data:", couponData);
      const { data } = await api.post('/', couponData);
      console.log("Response Data:", data);
      return data;
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 2xx
        console.error("Error Response:", error.response.data);
      } else if (error.request) {
        // Request was made but no response received
        console.error("No Response:", error.request);
      } else {
        // Something else happened
        console.error("Error Message:", error.message);
      }
      handleError(error, 'creating coupon');
    }
  },

  updatecoupon: async (couponId, updatedData) => {
    try {
      const { data } = await api.put(`/${couponId}`, updatedData);
      return data;
    } catch (error) {
      handleError(error, 'updating coupon');
    }
  },

  deletecoupon: async (couponId) => {
    try {
      const { data } = await api.delete(`/${couponId}`);
      return data;
    } catch (error) {
      handleError(error, 'deleting coupon');
    }
  }
};

export default couponService;
