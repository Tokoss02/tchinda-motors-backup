'use client';

import React from 'react';
import { Car } from '@/types/carvalue';
import Link from "next/link";
import { useState, useEffect } from 'react';
//import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "yet-another-react-lightbox/styles.css";
import CarSpecs from '@/components/CarSpecs';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import axios from 'axios';
import InquiryForm from '@/components/InquiryForm';
import { useParams } from 'next/navigation';


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
            <div className="tour-metas">
              <div className="tour-meta-right">
                <Link className="btn btn-share" href="#">
                  <svg width={16} height={18} viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 11.5332C12.012 11.5332 11.1413 12.0193 10.5944 12.7584L5.86633 10.3374C5.94483 10.0698 6 9.79249 6 9.49989C6 9.10302 5.91863 8.72572 5.77807 8.37869L10.7262 5.40109C11.2769 6.04735 12.0863 6.46655 13 6.46655C14.6543 6.46655 16 5.12085 16 3.46655C16 1.81225 14.6543 0.466553 13 0.466553C11.3457 0.466553 10 1.81225 10 3.46655C10 3.84779 10.0785 4.20942 10.2087 4.54515L5.24583 7.53149C4.69563 6.90442 3.8979 6.49989 3 6.49989C1.3457 6.49989 0 7.84559 0 9.49989C0 11.1542 1.3457 12.4999 3 12.4999C4.00433 12.4999 4.8897 11.9996 5.4345 11.2397L10.147 13.6529C10.0602 13.9331 10 14.2249 10 14.5332C10 16.1875 11.3457 17.5332 13 17.5332C14.6543 17.5332 16 16.1875 16 14.5332C16 12.8789 14.6543 11.5332 13 11.5332Z" fill="currentColor" />
                  </svg>
                  Share
                </Link>
                <Link className="btn btn-wishlish" href="#">
                  <svg width={20} height={18} viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M2.2222 2.3638C4.34203 0.243977 7.65342 0.0419426 10.0004 1.7577C12.3473 0.0419426 15.6587 0.243977 17.7786 2.3638C20.1217 4.70695 20.1217 8.50594 17.7786 10.8491L12.1217 16.5059C10.9501 17.6775 9.05063 17.6775 7.87906 16.5059L2.2222 10.8491C-0.120943 8.50594 -0.120943 4.70695 2.2222 2.3638Z" fill="currentColor" />
                  </svg>
                  Wishlish
                </Link>
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
                      className="main-image"
                      style={{ maxHeight: '100%', objectFit: 'cover', width: '100%' }}
                    />
                    <button onClick={handlePrev} className="btn btn-light position-absolute top-50 start-0 translate-middle-y z-1">
                      <i className="bi bi-arrow-left"></i>
                    </button>

                    <button onClick={handleNext} 
                    className="btn btn-light position-absolute top-50 end-0 translate-middle-y z-1 next"
                    
                    >
                      <i className="bi bi-arrow-right"></i>
                    </button>


                    {/* Action Buttons */}
                    <div className="box-button-abs">
                      <button
                        className="btn btn-warning d-flex align-items-center"
                        onClick={() => setIsOpen(true)}
                      >
                        <i className="bi bi-grid-3x3-gap-fill me-2"></i>
                        See All Photos
                      </button>

                      {car.videoUrl && (
                        <button onClick={() => setShowVideo(true)} className="btn btn-light border">
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



                <div className="box-feature-car">
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
          src: `http://localhost:5000${img}`,
        }))}
        index={photoIndex}
        on={{ view: ({ index }) => setPhotoIndex(index) }}
      />

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