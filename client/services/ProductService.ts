import apiClient from '@/lib/apiClient';
import { ProductData, Product } from '@/types';
import { catchError } from '@/utils/catchError';

// Define some dummy products for fallback
const dummyProducts: Product[] = [
  { id: '1', name: 'Elegant Modern Chair', description: 'A beautifully designed modern chair.', price: 149.99, imageUrl: 'https://example.com/images/chair.jpg' },
  { id: '2', name: 'Stylish Desk Lamp', description: 'A stylish desk lamp for your study or office.', price: 89.99, imageUrl: 'https://example.com/images/lamp.jpg' },
  { id: '3', name: 'Leather Office Chair', description: 'Comfortable leather office chair with excellent lumbar support.', price: 250.00, imageUrl: 'https://example.com/images/office-chair.jpg' }
];

// Function to get a list of products, returning dummy data on failure or if no products are available.
const getProducts = async (fields: Record<string, any> = {}): Promise<Product[]> => {
  try {
    const url = `/products`;
    const { data } = await apiClient.get(url, { params: fields });
    return data.data.products || dummyProducts;  // Use dummy products if no products are found
  } catch (error) {
    console.error('Failed to fetch products:', catchError(error));
    return dummyProducts;  // Return dummy products if there's an error
  }
};

// Function to get a specific product by ID, returning default product data on failure or if the product is not found.
export const getProduct = async (id: string): Promise<ProductData> => {
  try {
    const url = `/products/${id}`;
    const { data } = await apiClient.get(url);
    if (data.data.product) {
      return {
        product: data.data.product,
        relatedProducts: data.data.relatedProducts,
      };
    } else {
      // Find a dummy product by ID or return a generic empty product
      const product = dummyProducts.find(p => p.id === id) || { id: '', name: '', description: '', price: 0, imageUrl: '' };
      return {
        product: product,
        relatedProducts: []
      };
    }
  } catch (error) {
    console.error('Failed to fetch product details:', catchError(error));
    const product = dummyProducts.find(p => p.id === id) || { id: '', name: '', description: '', price: 0, imageUrl: '' };
    return {
      product: product,
      relatedProducts: []
    };  // Use a dummy product or a default empty product if there's an error
  }
};

// ProductService object that groups the service functions
const ProductService = {
  getProducts,
  getProduct,
};

export default ProductService;
