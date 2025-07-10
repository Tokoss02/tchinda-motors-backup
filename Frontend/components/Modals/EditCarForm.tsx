'use client';

import React, { useState } from 'react';
import { Car } from '@/types/carvalue';
import { updateCar } from '@/services/carService'; // ✅ use your service

interface EditCarFormProps {
  car: Car;
  onUpdate: () => void;
  onCancel: () => void;
}
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const EditCarForm: React.FC<EditCarFormProps> = ({ car, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState({
    name: car.name || '',
    brand: car.brand || '',
    modelCar: car.modelCar || '',
    year: car.year || '',
    price: car.price || '',
    condition: car.condition || '',
    mileage: car.mileage || 0,
    transmission: car.transmission || '',
    fuelType: car.fuelType || '',
    seats: car.seats || 0,
    engine: car.engine || 0,
    carType: car.carType || '',
    DriveType: car.carType || '',

  });

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  

  const [imagePreviews, setImagePreviews] = useState<string[]>(
    Array.isArray(car.images) ? car.images.map((img) => `${API_BASE_URL}/${img}`) : []
    //car.images ? car.images.map(img => `http://localhost:5000/${img}`) : []
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'mileage' || name === 'seats' || name === 'year' || name === 'price' || name === 'engine'? Number(value) : value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImageFiles(files);
      const previews = files.map(file => URL.createObjectURL(file));
      setImagePreviews(previews); //🆕 show only newly selected previews
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, String(value)); 
      });

      imageFiles.forEach((file) => {
        data.append('images', file); // matches your backend expected field
      });

      await updateCar(car._id!, data); // ✅ service method
      onUpdate();
    } catch (err) {
      console.error('Update failed:', err);
      setError('Failed to update car. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md border border-gray-200 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Edit Car</h2>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required className="input input-bordered" />
        <input name="brand" value={formData.brand} onChange={handleChange} placeholder="Brand" required className="input input-bordered" />
        <input name="DriveType" value={formData.DriveType} onChange={handleChange} placeholder="DriveType" required className="input input-bordered" />
        <input name="modelCar" value={formData.modelCar} onChange={handleChange} placeholder="Model" required className="input input-bordered" />
        <input type="number" name="year" value={formData.year} onChange={handleChange} placeholder="Year" required className="input input-bordered" />
        <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" required className="input input-bordered" />
        <input name="condition" value={formData.condition} onChange={handleChange} placeholder="Condition" required className="input input-bordered" />
        <input type="number" name="mileage" value={formData.mileage} onChange={handleChange} placeholder="Mileage" className="input input-bordered" />
        <input name="transmission" value={formData.transmission} onChange={handleChange} placeholder="Transmission" className="input input-bordered" />
        <input name="fuelType" value={formData.fuelType} onChange={handleChange} placeholder="Fuel Type" className="input input-bordered" />
        <input type="number" name="seats" value={formData.seats} onChange={handleChange} placeholder="Seats" className="input input-bordered" />
        <input type="number" name="engine" value={formData.engine} onChange={handleChange} placeholder="Engine" required className="input input-bordered" />
        <input type="file" accept="image/*" onChange={handleFileChange} multiple className="input" />

        <div className="flex gap-3 flex-wrap mt-2">
          {imagePreviews.map((src, idx) => (
            <img key={idx} src={src} alt="preview" width={100} className="rounded border" />
          ))}
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <div className="flex gap-3 mt-4">
          <button type="submit" disabled={loading} className="btn btn-primary">
            {loading ? 'Updating...' : 'Update'}
          </button>
          <button type="button" onClick={onCancel} className="btn btn-ghost">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCarForm;
