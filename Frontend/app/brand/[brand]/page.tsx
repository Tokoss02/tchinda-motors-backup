// app/brand/[brand]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { Car } from '@/types/carvalue'; // adjust the path to your Car interface

const BrandPage = () => {
  const { brand } = useParams();
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCarsByBrand = async () => {
      try {
        const response = await axios.get<Car[]>(
          `http://localhost:3000/cars?brand=${brand}`
        );
        setCars(response.data);
      } catch (error) {
        console.error('Failed to fetch cars:', error);
      } finally {
        setLoading(false);
      }
    };

    if (brand) {
      fetchCarsByBrand();
    }
  }, [brand]);

  if (loading) return <div>Loading cars...</div>;

  return (
    <div className="container py-4">
      <h1 className="mb-4">Cars by {brand?.toString()}</h1>
      {cars.length === 0 ? (
        <p>No cars found for this brand.</p>
      ) : (
        <div className="row">
          {cars.map((car) => (
            <div key={car._id} className="col-md-4 mb-4">
              <div className="card h-100">
                <img src={car.images[0]} alt={car.modelCar} className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title">{car.brand} {car.modelCar}</h5>
                  <p className="card-text">${car.price.toLocaleString()}</p>
                  <a href={`/cars/${car._id}`} className="btn btn-primary">View Details</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BrandPage;
