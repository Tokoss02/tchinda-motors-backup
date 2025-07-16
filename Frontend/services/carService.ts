import axios from 'axios';
import { Car } from '@/types/carvalue';
import { getAuthToken } from '@/util/auth';



const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// 🏎️ Fetch all cars ----
export const getCars = async (queryParams: Record<string, string> = {}): Promise<Car[]> => {
  const query = new URLSearchParams(queryParams).toString();
  const response = await axios.get<Car[]>(`${API_BASE_URL}/cars${query ? `?${query}` : ''}`);
  return response.data;
};

// ❌ Delete a car
export const deleteCar = async (_id: string): Promise<void> => {
  try {
    const token = getAuthToken();
    await axios.delete(`${API_BASE_URL}/cars/${_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error(`Failed to delete car with ID: ${_id}`, error);
    throw error;
  }
};

// ➕ Add a new car
export const addCar = async (carData: FormData) => {
  try {
    const token = getAuthToken();
    const response = await axios.post(`${API_BASE_URL}/cars`, carData, {
      headers: {
        Authorization: `Bearer ${token}`, // <-- IMPORTANT!
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding car', error);
    throw new Error('Failed to add car');
  }
};

// ✏️ Update a car
export const updateCar = async (_id: string, carData: FormData): Promise<Car> => {
  const token = getAuthToken();

  const response = await axios.put<Car>(`${API_BASE_URL}/cars/${_id}`, carData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};


export const getCarStats = async () => {
  try {
    const response = await axios.get('/api/cars/stats'); // Adjust the API endpoint as needed
    return response.data;
  } catch (error) {
    console.error('Error fetching car stats:', error);
    throw new Error('Failed to fetch car stats');
  }
};


export const getCarById = async (id: string): Promise<Car> => {
  const response = await axios.get<Car>(`${API_BASE_URL}/cars/${id}`);

  return response.data;
};


  export const getCarsByBrandSlug = async (brandSlug: string): Promise<Car[]> => {
  try {
    const response = await axios.get<Car[]>(`${API_BASE_URL}/cars/brand/${brandSlug}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching cars by brand slug:", error);
    return [];
  }
};

 export async function getCarsByBrandAndModelSlug(brandSlug: string, modelSlug: string): Promise<Car[]> {
  const response = await axios.get<Car[]>(`${API_BASE_URL}/cars/brand/${brandSlug}/model/${modelSlug}`);
  return response.data; 
}

export async function getCarBySlugs(brandSlug: string, modelSlug: string): Promise<Car | null> {
  try {
    const response = await axios.get<Car>(`${API_BASE_URL}/cars/${brandSlug}/${modelSlug}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching car by slugs:', error);
    return null;
  }
}


export const getCarsByCategory = async (category: string) => {
  try {
    const res = await fetch(`${API_BASE_URL}/cars/by-category/${category}`, {
      cache: 'no-store',
    })
    if (!res.ok) return []
    return res.json()
  } catch (err) {
    console.error('Error fetching cars by category:', err)
    return []
  }
}





