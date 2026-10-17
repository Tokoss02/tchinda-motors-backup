
'use client';

import Link from 'next/link';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Car } from '@/types/carvalue';
import { generateCarSlug } from '@/util/slugUtils';

interface CarCardProps {
  car: Car;
  onEdit?: (car: Car) => void;
  onDelete?: (carId: string) => void;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const WHATSAPP_PHONE = '971523117757';

export default function CarCard({ car }: CarCardProps) {
  const [whatsAppLink, setWhatsAppLink] = useState('');

  const detailsUrl = `/cars-details/${car.brandSlug}/${car.modelSlug}/${generateCarSlug(car)}`;

  // Support year fields without requiring a change to your Car interface.
  const carYear = (car as Car & {
    year?: string | number;
    modelYear?: string | number;
  }).year ??
    (car as Car & {
      modelYear?: string | number;
    }).modelYear;

  const imageValue = Array.isArray(car.images)
    ? car.images.find(
      (image): image is string =>
        typeof image === 'string' && image.length > 0
    )
    : null;

  const imageUrl = imageValue
    ? imageValue.startsWith('/uploads')
      ? `${API_BASE_URL}${imageValue}`
      : imageValue.startsWith('http') || imageValue.startsWith('/')
        ? imageValue
        : `${API_BASE_URL}/${imageValue.replace(/^\/+/, '')}`
    : '/default-car.jpg';

  useEffect(() => {
    const message = `I'm interested in this car: http://localhost:3000${detailsUrl}`;
    setWhatsAppLink(
      `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(message)}`
    );
  }, [detailsUrl]);

  const handleCarClick = () => {
    // Avoid crashing when Google Analytics is not installed.
    if (typeof window !== 'undefined') {
      const gtag = (
        window as Window & {
          gtag?: (
            command: string,
            action: string,
            params: Record<string, string>
          ) => void;
        }
      ).gtag;

      gtag?.('event', 'click_car_detail', {
        event_category: 'Inventory',
        event_label: car.name || 'Unknown Car',
      });
    }
  };

  return (
    <article className="tm-car-card">
      {/* Vehicle image and year */}
      <div className="tm-car-card__image">
        <Link
          href={detailsUrl}
          onClick={handleCarClick}
          aria-label={`View ${car.name}`}
          className="tm-car-card__image-link"
        >
          <Image
            src={imageUrl}
            alt={car.name || 'Vehicle for sale'}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="tm-car-card__photo"
          />

          {carYear && (
            <span className="tm-car-card__year">
              {carYear}
            </span>
          )}

          {car.CarStatus &&
            ['Sold', 'Booked', 'Coming Soon'].includes(car.CarStatus) && (
              <span
                className={`tm-car-card__status tm-car-card__status--${car.CarStatus
                  .toLowerCase()
                  .replace(/\s+/g, '-')}`}
              >
                {car.CarStatus}
              </span>
            )}
        </Link>
      </div>

      {/* Vehicle details */}
      <div className="tm-car-card__body">
        <Link
          href={detailsUrl}
          onClick={handleCarClick}
          className="tm-car-card__title"
          title={car.name}
        >
          {car.name}
        </Link>

        <div className="tm-car-card__accent" />

        <div className="tm-car-card__footer">
          <div className="tm-car-card__specs">
            <span className="tm-car-card__spec">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                className="tm-car-card__icon"
              >
                <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.6" />
                <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.6" />
                <path d="M12 4v2 M12 18v2 M4 12h2 M18 12h2" stroke="currentColor" strokeWidth="1.6" />
              </svg>
              <span>{car.transmission || 'Automatic'}</span>
            </span>

            <span className="tm-car-card__divider" />

            <span className="tm-car-card__spec">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                className="tm-car-card__icon"
              >
                <path
                  d="M7 21V5.5A1.5 1.5 0 0 1 8.5 4h6A1.5 1.5 0 0 1 16 5.5V21M5 21h13M9 7h5v5H9zM16 9h2l2 3v6a1 1 0 0 1-2 0v-3h-2"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>{car.fuelType || 'Fuel'}</span>
            </span>

            <span className="tm-car-card__divider" />
            
            {/* Seats */}
            <span className="tm-car-card__spec">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                className="tm-car-card__icon"
              >
                <path
                  d="M7 12V6a2 2 0 0 1 4 0v4h4a3 3 0 0 1 3 3v3H7a3 3 0 0 1-3-3v-1a2 2 0 0 1 2-2h1ZM7 16v3m11-3v3"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>{car.seats ? `${car.seats} Seats` : 'Seats N/A'}</span>
            </span>


          </div>


        </div>
        {whatsAppLink && (
          <a
            href={whatsAppLink}
            target="_blank"
            rel="noopener noreferrer"
            className="tm-car-card__button"
          >
            <span>Enquire Now</span>
            <svg
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
              className="tm-car-card__arrow"
            >
              <path
                d="M4 10h12m-5-5 5 5-5 5"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        )}
      </div>
    </article>
  );
}
