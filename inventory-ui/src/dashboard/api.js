// Add to api.js for debugging
import axios from "axios";
const API_BASE_URL="http://localhost:8080/api"
export const categoryService = {
  async getCategoriesWithCounts() {
    try {
      const response = await axios.get(`${API_BASE_URL}/categories`);
      console.log('Categories API Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Categories API Error:', error);
      throw error;
    }
  },

  async getSubcategories(category) {
    try {
      const response = await axios.get(`${API_BASE_URL}/categories/${category}/subcategories`);
      console.log('Subcategories API Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Subcategories API Error:', error);
      throw error;
    }
  },

  async getProductsByCategory(category, subCategory = null, page = 1) {
    try {
      const params = { page };
      if (subCategory) params.subCategory = subCategory;
      
      const response = await axios.get(
        `${API_BASE_URL}/categories/${category}/products`,
        { params }
      );
      console.log('Products API Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Products API Error:', error);
      throw error;
    }
  }
};