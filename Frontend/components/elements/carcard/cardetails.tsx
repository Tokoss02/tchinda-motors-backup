'use client';

import React from 'react';
import { Car } from '@/types/carvalue';
import Link from "next/link";
import { useState, useEffect } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "yet-another-react-lightbox/styles.css";
import CarSpecs from '@/components/CarSpecs';
import InquiryForm from '@/components/InquiryForm';
import { useParams } from 'next/navigation';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import CarSpecsSection from './CarSpecsSection';


type CarsDetailsProps = {
  car: Car;
};


const CarsDetails: React.FC<CarsDetailsProps> = ({ car }) => {
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const images = car.images.map((url: string) => ({ src: url }));


  const handlePrev = () => {
    setMainImageIndex((prev) => (prev === 0 ? car.images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setMainImageIndex((prev) => (prev === car.images.length - 1 ? 0 : prev + 1));
  };

  const handleThumbnailClick = (index: number) => {
    setMainImageIndex(index);
  };

  const BreadcrumbArrow = () => (
    <span className="arrow-right">
      <svg width={7} height={12} viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 11L6 6L1 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const getEmbedUrl = (url: string | undefined): string => {
    if (!url) return '';
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : '';
  };

  const slides = images.map((img) => ({ src: img }));
  const params = useParams();
  const carSlug = params?.carSlug as string;
  return (

    <div className="container">
      {/* Breadcrumb */}
      <section className="box-section box-breadcrumb background-body">
        <nav aria-label="breadcrumbs">
          <ol className="breadcrumbs">

            <li><a href="/">Home</a>
              <span className="arrow-right">
                <svg width={7} height={12} viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 11L6 6L1 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </li>
            <li className="arrow-right">
              <a href="/inventory">Inventory</a>
              <BreadcrumbArrow />
            </li>
            <li className="arrow-right">
              <Link href={`/inventory/${car.brandSlug}`}>{car.brand}</Link>
              <BreadcrumbArrow />
            </li>
            <li className="arrow-right">
              <Link href={`/inventory/${car.brandSlug}/${car.modelSlug}`}>{car.modelCar}</Link>
              <BreadcrumbArrow />
            </li>
            <li><span className="text-breadcrumb">{car.name}</span></li>
          </ol>

        </nav>
      </section>
      {/* Car Title */}
      <section className="box-section box-content-tour-detail background-body pt-0">
        <div className="container">
          <div className="tour-header">
            <div className="rate-element">
              <span className="rating">
                {car.condition}
              </span>
            </div>
            <div className="row">
              <div className="col-lg-8">
                <div className="tour-title-main">
                  <h4 className="heading-4 neutral-900">{car.name}</h4>
                </div>
              </div>
            </div>
            
          </div>
          <div className="row">
            {/* Left Column - Main Content */}

            <div className="col-lg-8">

              {/* Main Image with Arrows */}
              <div className="container-banner-activities">
                <div className="box-banner-activities">

                  {/* Main Car Image Section */}
                  <div className="position-relative mb-3">

                    <img
                      src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${car.images[mainImageIndex]}`}
                      alt={`${car.brand} ${car.modelCar}`}
                      className="main-image rounded"
                      style={{ maxHeight: '100%', objectFit: 'cover', width: '100%' }}
                      onClick={() => setIsOpen(true)}
                    />
                    <button
                      onClick={handlePrev}
                      aria-label="Previous"

                      className="btn-light rounded-5 shadow position-absolute top-50 start-0 translate-middle-y z-3 d-flex align-items-center justify-content-center"
                      style={{ width: '60px', height: '60px', opacity: 0.8 }}
                    >
                      <i className="bi bi-arrow-left fs-5"></i>
                    </button>

                    <button
                      onClick={handleNext}
                      aria-label="Next"
                      className="btn-light rounded-5 shadow position-absolute top-50 end-0 translate-middle-y z-3 d-flex align-items-center justify-content-center"
                      style={{ width: '60px', height: '60px', opacity: 0.8 }}
                    >
                      <i className="bi bi-arrow-right fs-5"></i>
                    </button>

                    {/* Action Buttons */}
                    <div className="box-button-abs">

                      {car.videoUrl && (
                        <button onClick={() => setShowVideo(true)} className="btn btn-light border rounded">
                          <i className="bi bi-play-circle me-2"></i> Watch Video
                        </button>
                      )}
                    </div>
                  </div>


                  {/* Thumbnails */}
                  <div className="d-flex gap-2 overflow-auto mb-4">
                    {car.images.map((img, index) => (
                      <img
                        key={index}
                        src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${img}`}
                        alt={`Thumbnail image of ${car.name}`}
                        className={`rounded border ${index === mainImageIndex ? 'border-primary' : ''}`}
                        style={{
                          width: '120px',
                          height: '90px',
                          objectFit: 'cover',
                          cursor: 'pointer',
                          opacity: index === mainImageIndex ? 1 : 0.6,
                        }}
                        onClick={() => handleThumbnailClick(index)}
                      />
                    ))}
                  </div>
                </div>
                {/* Feature Tags */}



                <div>
                  <div className="list-feature-car align-items-start">
                    <div className="item-feature-car w-md-25">
                      <div className="item-feature-car-inner">
                        <div className="feature-image"><img src="/assets/imgs/page/car/km.svg" alt="Tokoss Motors" /></div>
                        <div className="feature-info">
                          <p className="text-md-medium neutral-1000">{car.mileage} Km</p>
                        </div>
                      </div>
                    </div>
                    <div className="item-feature-car w-md-25">
                      <div className="item-feature-car-inner">
                        <div className="feature-image"><img src="/assets/imgs/page/car/diesel.svg" alt="Tokoss Motors" /></div>
                        <div className="feature-info">
                          <p className="text-md-medium neutral-1000">{car.fuelType}</p>
                        </div>
                      </div>
                    </div>
                    <div className="item-feature-car w-md-25">
                      <div className="item-feature-car-inner">
                        <div className="feature-image"><img src="/assets/imgs/page/car/auto.svg" alt="Tokoss Motors" /></div>
                        <div className="feature-info">
                          <p className="text-md-medium neutral-1000">{car.transmission}</p>
                        </div>
                      </div>
                    </div>
                    <div className="item-feature-car w-md-25">
                      <div className="item-feature-car-inner">
                        <div className="feature-image"><img src="/assets/imgs/page/car/seat.svg" alt="Tokoss Motors" /></div>
                        <div className="feature-info">
                          <p className="text-md-medium neutral-1000">{car.seats} Seaters</p>
                        </div>
                      </div>
                    </div>
                    <div className="item-feature-car w-md-25">
                      <div className="item-feature-car-inner">
                        <div className="feature-image"><img src="/assets/imgs/page/car/bag.svg" alt="Tokoss Motors" /></div>
                        <div className="feature-info">
                          <p className="text-md-medium neutral-1000">{car.modelCar}</p>
                        </div>
                      </div>
                    </div>
                    <div className="item-feature-car w-md-25">
                      <div className="item-feature-car-inner">
                        <div className="feature-image"><img src="/assets/imgs/page/car/suv.svg" alt="Tokoss Motors" /></div>
                        <div className="feature-info">
                          <p className="text-md-medium neutral-1000">{car.carType}</p>
                        </div>
                      </div>
                    </div>
                    <div className="item-feature-car w-md-25">
                      <div className="item-feature-car-inner">
                        <div className="feature-image"><img src="/assets/imgs/page/car/door.svg" alt="Tokoss Motors" /></div>
                        <div className="feature-info">
                          <p className="text-md-medium neutral-1000">{car.DriveType}</p>
                        </div>
                      </div>
                    </div>
                    <div className="item-feature-car w-md-25">
                      <div className="item-feature-car-inner">
                        <div className="feature-image"><img src="/assets/imgs/page/car/lit.svg" alt="Tokoss Motors" /></div>
                        <div className="feature-info">
                          <p className="text-md-medium neutral-1000">{car.engine} Liter </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description & Specs */}
                <div className="accordion" id="carDetailsAccordion">
                  <div className="accordion-item">

                    {/* Car Specs section (with PDF/image download) */}
                    <CarSpecs carId={car._id} />
                    <CarSpecsSection specs={car} />

                  </div>
                </div>
              </div>
            </div>
            {/* Right Column - Booking Sidebar */}
            <div className="col-lg-4">
              <InquiryForm car={{
                carSlug: car.carSlug,
                brandSlug: car.brandSlug,
                modelSlug: car.modelSlug
              }} />
            </div>
          </div>
        </div>
      </section>

      

      {/* Modal */}

      <Lightbox
        open={isOpen}
        close={() => setIsOpen(false)}
        slides={car.images.map((img) => ({
          src: `${process.env.NEXT_PUBLIC_API_BASE_URL}${img}`,
          alt: `Thumbnail image of ${car.name}`
        }))}
        index={photoIndex}
        on={{ view: ({ index }) => setPhotoIndex(index) }}
       
       plugins={[Thumbnails]}
        thumbnails={{
          position: 'bottom',
          width: 120,
          height: 90,
          padding: 0.25,
          gap: 8,
          showToggle: true,
        }}
      />



      {/* Video Modal */}

      {showVideo && (
        <div className="modal fade show d-block" tabIndex={-1} role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}>
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content bg-dark">
              <div className="modal-header border-0">
                <h5 className="modal-title text-white">{car.name} - Video</h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setShowVideo(false)}></button>
              </div>
              <div className="modal-body p-0">
                <div className="ratio ratio-16x9">
                  <iframe
                    src={getEmbedUrl(car.videoUrl)}
                    title="Car Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default CarsDetails;