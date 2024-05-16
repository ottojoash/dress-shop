import apiClient from '@/lib/apiClient';
import { Category } from '@/types';
import { catchError } from '@/utils/catchError';

const getCategories = async (): Promise<Category[]> => {
  try {
    const { data } = await apiClient.get(`/categories`);
    return data.data;  // Assuming 'data.data' contains the array of categories
  } catch (error) {
    console.error('Failed to fetch categories:', catchError(error));
    // Return dummy data
    return [
      { id: 1, name: 'Clothing', description: 'A variety of clothing items' },
      { id: 2, name: 'Electronics', description: 'Latest gadgets and devices' },
      { id: 3, name: 'Home & Garden', description: 'Everything for your home and garden' }
    ];
  }
};

const CategoryService = {
  getCategories,
};

export default CategoryService;
