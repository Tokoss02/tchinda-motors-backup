import Link from 'next/link';
import React from 'react';
import { Car } from '@/types/carvalue';
import Image from 'next/image';
import { generateCarSlug } from '@/util/slugUtils';

interface CarCardProps {
  car: Car;
  onEdit?: (car: Car) => void;
  onDelete?: (carId: string) => void;

}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export default function CarCard({ car }: CarCardProps) {

  // Use car.images if available, fallback to imageUrls (during upload preview)

  const firstImage = Array.isArray(car.images) && car.images.length > 0
    ? car.images[0]
    : Array.isArray(car.images) && typeof car.images[0] === 'string'
      ? car.images[0]
      : null;
const handleCarClick = () => {
  gtagEvent({
    action: 'click_car_detail',
    category: 'Inventory',
    label: car.name || 'Unknown Car',
  });
};

  const imageUrl = firstImage
    ? firstImage.startsWith('http') || firstImage.startsWith('/')
      ? firstImage.startsWith('/uploads')
        ? `${API_BASE_URL}${firstImage}`
        : firstImage
      : `${API_BASE_URL}${firstImage}`
    : '/default-car.jpg';

  const detailsUrl = `/cars-details/${car.brandSlug}/${car.modelSlug}/${generateCarSlug(car)}`;
  console.log('✅ Image URL:', imageUrl);
  console.log(car);

  return (

    <div className="card-journey-small background-card hover-up card-image img">
      <div className="card-image">
        <Link href={detailsUrl} onClick={handleCarClick}>

          <Image
            src={imageUrl}
            alt={car.name || 'Car image'}
            width={200}
            height={100}
            className="rounded-t-lg object-cover w-full h-48 sm:h-64 md:h-52"
            style={{ height: 'auto', objectFit: 'contain', paddingBottom: '30px' }}
          />
        </Link>

      </div>

      {/*Condition Badge */}
      <div className="card-info p-4 pt-30 text-neutral-900">
        <div className="card-rating">
          <div className="card-left" />
          <div className="card-right">
            <span
              className="rating text-xs-medium rounded-pill"
              style={{
                backgroundColor: car.condition === 'New' ? '#087d00' : '#ba2528',
                color: car.condition === 'New' ? '#fff' : '#fff',
              }}
            >
              {car.condition}
            </span>
          </div>
        </div>

        <div className="card-title">
          <Link className="text-lg-bold neutral-1000 text-nowrap" href={detailsUrl} onClick={handleCarClick}>
            {car.name}
          </Link>
          <p className="heading-6 text-primary-800 mt-1">
            {car.price && car.price > 0
              ? `$${car.price.toLocaleString()}`
              : 'Ask for Price'}
          </p>
        </div>
        <div className="card-program">
          <div className="card-facitlities">
            <p className="card-miles text-md-medium">{car.mileage} Km</p>
            <p className="card-gear text-md-medium">{car.transmission}</p>
            <p className="card-fuel text-md-medium">{car.fuelType}</p>
            <p className="card-seat text-md-medium">{car.seats} seats</p>
          </div>

          {/*<div className="endtime flex flex-col gap-2 mt-4">
                <div className="card-button">
                  <Link className="btn btn-gray" href={detailsUrl}>
                    Book Now
                  </Link>
                </div>
              </div>*/}
        </div>
      </div>
    </div>
  );
}
function gtagEvent(arg0: { action: string; category: string; label: string; }) {
  throw new Error('Function not implemented.');
}

