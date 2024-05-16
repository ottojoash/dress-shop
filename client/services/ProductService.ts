import apiClient from '@/lib/apiClient';
import { ProductData, Product } from '@/types';
import { catchError } from '@/utils/catchError';

// Function to get a list of products, returning an empty array on failure or if no products are available.
const getProducts = async (fields: Record<string, any> = {}): Promise<Product[]> => {
  try {
    const url = `/products`;
    const { data } = await apiClient.get(url, { params: fields });
    return data.data.products || [];  // Ensure fallback to an empty array if no products are found
  } catch (error) {
    console.error('Failed to fetch products:', catchError(error));
    return [];  // Return an empty array if there's an error
  }
};

// Function to get a specific product by ID, returning default product data on failure or if the product is not found.
export const getProduct = async (id: string): Promise<ProductData> => {
  try {
    const url = `/products/${id}`;
    const { data } = await apiClient.get(url);
    return data.data.product ? {
      product: data.data.product,
      relatedProducts: data.data.relatedProducts,
    } : {
      product: { id: '', name: '', description: '', price: 0, imageUrl: '' }, // Default empty product
      relatedProducts: []
    };  // Return default empty product data if no product is found
  } catch (error) {
    console.error('Failed to fetch product details:', catchError(error));
    return {
      product: { id: '', name: '', description: '', price: 0, imageUrl: '' }, // Default empty product
      relatedProducts: []
    };  // Return default empty product data if there's an error
  }
};

// ProductService object that groups the service functions
const ProductService = {
  getProducts,
  getProduct,
};

export default ProductService;
