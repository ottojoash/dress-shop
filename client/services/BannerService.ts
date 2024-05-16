import apiClient from '@/lib/apiClient';
import { Banner } from '@/types';
import { catchError } from '@/utils/catchError';

// Define some dummy banner data for fallback
const dummyBanners: Banner[] = [
  { id: '1', imageUrl: 'https://example.com/images/banner1.jpg', linkUrl: '/promotions', description: 'Spring Sale' },
  { id: '2', imageUrl: 'https://example.com/images/banner2.jpg', linkUrl: '/new-arrivals', description: 'Discover New Arrivals' }
];

const getBanners = async (): Promise<Banner[]> => {
  try {
    const { data } = await apiClient.get(`/banners`);
    return data.data || dummyBanners;  // Use dummy banners if no banners are found
  } catch (error) {
    console.error('Failed to fetch banners:', catchError(error));
    return dummyBanners;  // Return dummy banners if there's an error
  }
};

const BannerService = {
  getBanners,
};

export default BannerService;
