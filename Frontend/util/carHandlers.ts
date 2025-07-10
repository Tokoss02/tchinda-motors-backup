import { Car } from '@/types/carvalue';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// ✨ Normalize car data before sending (used for updates only)
function sanitizeCarData(car: Car): Car {
  return {
    ...car,
    price: typeof car.price === 'string' ? Number(car.price) : car.price,
    year: typeof car.year === 'string' ? Number(car.year) : car.year,
  };
}

// ➕ Add new car using FormData
export async function addCar(car: Car, token: string): Promise<Car | null> {
  try {
    const formData = new FormData();

    formData.append('name', car.name);
    formData.append('brand', car.brand);
    formData.append('modelCar', car.modelCar);  // Corrected to match the DTO
    formData.append('year', car.year.toString());
    formData.append('condition', car.condition);
    formData.append('price', car.price.toString());
    formData.append('carType', car.carType);  // Added carType field
    formData.append('fuelType', car.fuelType); // Added fuelType field
    formData.append('transmission', car.transmission); // Added transmission field
    formData.append('engine', car.engine.toString());
    formData.append('mileage', car.mileage.toString());
    formData.append('seats', car.seats.toString());
    formData.append('DriveType', car.DriveType);
    

     // ✅ Append only File objects
     
     if (car.newImages && Array.isArray(car.newImages)) {
      car.newImages.forEach((file) => {
        formData.append('images', file); // File object
      });
    }

    const res = await fetch(`${API_BASE_URL}/cars`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!res.ok) {
      console.error('Add car failed: try again.', await res.text());
      return null;
    }

    return await res.json();
  } catch (err) {
    console.error('Add car error:', err);
    return null;
  }
}

// ✏️ Update existing car using sanitized JSON
export async function updateCar(car: Car, token: string): Promise<Car | null> {
  if (!car._id) {
    console.error('updateCar: missing car._id');
    return null;
  }

  const sanitized = sanitizeCarData(car);

  try {
    const formData = new FormData();
    // Append updated fields
    formData.append('name', car.name);
    formData.append('brand', sanitized.brand);
    formData.append('modelCar', sanitized.modelCar);
    formData.append('year', sanitized.year.toString());
    formData.append('condition', sanitized.condition);
    formData.append('price', sanitized.price.toString());
    formData.append('carType', sanitized.carType);  // Added carType field
    formData.append('fuelType', sanitized.fuelType); // Added fuelType field
    formData.append('transmission', sanitized.transmission); // Added transmission field
    formData.append('engine', sanitized.engine.toString());
    formData.append('mileage', sanitized.mileage.toString());
    formData.append('seats', sanitized.seats.toString());
    formData.append('DriveType', car.DriveType);
    

    // Handle images if provided
    if (car.newImages && Array.isArray(car.newImages)) {
  car.newImages.forEach((file) => {
    console.log('Images being uploaded:', car.newImages);
          console.log('Each image type:', car.newImages?.map(img => typeof img));
    formData.append('images', file); // This must be a File object
  });
}

// Append new image files
if (car.newImages && Array.isArray(car.newImages)) {
  car.newImages.forEach((file) => {
    formData.append('images', file); // backend expects this for FilesInterceptor
  });
}

    const res = await fetch(`${API_BASE_URL}/cars/${car._id}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!res.ok) {
      console.error('Update car failed:', await res.text());
      return null;
    }

    return await res.json();
  } catch (err: unknown) {
    console.error('Update car error:', err);
    return null;
  }
}

// ❌ Delete a car
export async function deleteCar(id: string, token: string): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE_URL}/cars/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      console.error('Delete car failed:', await res.text());
      return false;
    }

    return true;
  } catch (err: unknown) {
    console.error('Delete car error:', err);
    return false;
  }
}




