'use client';

import Link from "next/link";
import Marquee from 'react-fast-marquee';
import { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface BrandCount {
  brand: string;
  count: number;
}

export default function Brand2() {
  const [brands, setBrands] = useState<BrandCount[]>([]);

  useEffect(() => {
    axios.get<BrandCount[]>(`${API_BASE_URL}/cars/count-by-brand`)
      .then((res) => {
        setBrands(res.data);
      })
      .catch((err) => console.error("API Error:", err));
  }, []);

  const brandImages: { [key: string]: string } = {
    toyota: '/assets/imgs/brand/toyota.png',
    mercedes: '/assets/imgs/brand/mercedes.png',
    bmw: '/assets/imgs/brand/bmw.png',
    ford: '/assets/imgs/brand/ford.png',
    peugeot: '/assets/imgs/brand/peugeot.png',
    hyundai: '/assets/imgs/brand/hyundai.png',
    nissan: '/assets/imgs/brand/nissan.png',
    mitsubishi: '/assets/imgs/brand/mitsubishi.png',
    isuzu: '/assets/imgs/brand/isuzu.png',
    suzuki: '/assets/imgs/brand/suzuki.png',
    kia: '/assets/imgs/brand/kia.png',
    lamborghini: '/assets/imgs/brand/lamborghini.png',
    chevrolet: '/assets/imgs/brand/chevrolet.png',
    ferrari: '/assets/imgs/brand/ferrari.png',
    lexus: '/assets/imgs/brand/lexus.png',
    ram: '/assets/imgs/brand/ram.png',
    cadillac: '/assets/imgs/brand/cadillac.png',
    gac: '/assets/imgs/brand/gac.png',
    geely: '/assets/imgs/brand/geely.png',
    infiniti: '/assets/imgs/brand/infiniti.png',
    byd: '/assets/imgs/brand/byd.png',
    'land rover': '/assets/imgs/brand/land_rover.png',
    // Add more as needed
  };

  const getBrandImage = (brand: string) => {
    const key = brand.toLowerCase().trim();
    return brandImages[key] || '/assets/imgs/brand/default.png';
  };

  return (
    <div className="background-100 pb-20">
      <div className="container">
        <div className="box-search-category">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <div>
              <h3 className="heading-4 mb-0 neutral-1000">Our Brands</h3>
              <p className="text-lg-medium neutral-800">Unveil the Finest Selection of High-End Vehicles</p>
            </div>
          </div>

          <Marquee pauseOnHover speed={40} gradient={false}>
          {brands.length === 0 ? (
            <div className="text-danger">No car brands found.</div>
          ) : (
            brands.map((brandItem, index) => (
              <Link
                href={`/inventory/${encodeURIComponent(brandItem.brand.toLowerCase())}`}
                key={index}
                className="text-decoration-none"
              >
                <div className="mx-2 text-center bg-white rounded-3 p-3 d-flex flex-column align-items-center shadow-sm" style={{ width: '140px', minHeight: '160px' }}>
                  <div className="card-body p-3">
                    <img
                      src={getBrandImage(brandItem.brand)}
                      alt={brandItem.brand}
                      className="img-fluid mb-2"
                      style={{ maxHeight: '50px', objectFit: 'contain' }}
                    />
                    <div className="text-lg-bold neutral-1000">{brandItem.brand}</div>
                    <div className="text-muted" style={{ fontSize: '14px' }}>{brandItem.count} cars</div>
                  </div>
                </div>
              </Link>
            ))
          )}
          </Marquee>
        </div>
      </div>
    </div>
  );
}
