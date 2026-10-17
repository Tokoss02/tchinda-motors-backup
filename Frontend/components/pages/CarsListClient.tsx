'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import CarCard from '@/components/elements/carcard/CarCard';
import SortCarsFilter from '@/components/elements/SortCarsFilter';
import ByPagination from '@/components/Filter/ByPagination';
import useCarFilter from '@/util/useCarFilter';
import Search1 from '@/components/sections/Search1';
import { useCarActions } from '@/hooks/usecarActions';
import Brand2 from '@/components/sections/Brand2';
import { Car } from '@/types/carvalue';
import axios from 'axios';
import { Setting } from '@/types/setting';


const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function CarsListClient() {
  const searchParams = useSearchParams();
  const { cars: allCars, isLoading, error } = useCarActions();
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [settings, setSettings] = useState<Setting | null>(null);
  const [recentCars, setRecentCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);




  useEffect(() => {
    const fetchRecentCars = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/cars`);
        const data = await res.json();

        // 🔥 Filter
        const brand = searchParams.get('brand') || '';
        const modelCar = searchParams.get('modelCar') || '';
        const fuelType = searchParams.get('fuelType') || '';
        const transmission = searchParams.get('transmission') || '';
        const condition = searchParams.get('condition') || 'all';

        let filtered = data.filter((car: any) => {
          return (
            (!brand || car.brand.toLowerCase().includes(brand.toLowerCase())) &&
            (!modelCar || car.modelCar.toLowerCase().includes(modelCar.toLowerCase())) &&
            (!fuelType || car.fuelType === fuelType) &&
            (!transmission || car.transmission === transmission) &&
            (condition === 'all' || car.condition === condition)
          );
        });

        // 🔥 Sort by createdAt (newest first)
        filtered = filtered.sort(
          (a: any, b: any) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        setFilteredCars(filtered);
        setRecentCars(filtered); // if you also want to keep track of "recent"
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch recent cars:', err);
        setLoading(false);
      }
    };

    fetchRecentCars();
  }, [searchParams]);


  const {
    currentPage,
    totalPages,
    paginatedCars,
    handleItemsPerPageChange,
    handlePageChange,
    handlePreviousPage,
    handleNextPage,
  } = useCarFilter(filteredCars);

  return (
    <>
      

      <div className="page-header pt-30 background-body">
				<div className="custom-container position-relative mx-auto">
					<div className="bg-overlay rounded-12 overflow-hidden">
						<img className="w-100 h-100 rounded-12 img-banner" src="/assets/imgs/page-header/banner01.jpg" alt="Tchinda Motors" />
					</div>
					<div className="container position-absolute z-1 top-50 start-50 translate-middle">
						{/*<h2 className="text-white mt-4">{'Find the Car That Moves You'}</h2>*/}
            <span className="text-white text-lg-medium">{'Search, Buy and Export'}</span>
          </div>
					</div>
				</div>

      <Search1 />

      <section className="section-box pt-130 background-body">
        <div className="container">
          <div className="row align-items-end">
            <div className="col-md-9 mb-30 wow">
              <h4 className="title-svg neutral-1000 mb-15">Our Inventory</h4>
              <p className="text-lg-medium text-bold neutral-500">Turning dreams into reality with versatile vehicles.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="box-section block-content-tourlist background-body">
        <div className="container">
          <div className="box-content-main pt-20">
            <div className="content-right">
              {error && <div className="alert alert-danger">{error}</div>}

              {isLoading ? (
                <p>Loading cars...</p>
              ) : (
                <>
                  <div className="box-filters mb-25 pb-5 border-bottom border-1">
                    <SortCarsFilter handleItemsPerPageChange={handleItemsPerPageChange} />
                  </div>

                  <div className="box-grid-tours wow">
                    <div className="row g-3">
                      {recentCars.length > 0 ? (
                        recentCars.map((car) => (
                          <div className="col-12 col-md-4 col-lg-3 element.style.card" key={car._id}>
                            <CarCard car={car} />
                          </div>
                        ))
                      ) : (
                        <p>No recent cars found.</p>
                      )}
                    </div>
                  </div>

                  <ByPagination
                    handlePreviousPage={handlePreviousPage}
                    totalPages={totalPages}
                    currentPage={currentPage}
                    handleNextPage={handleNextPage}
                    handlePageChange={handlePageChange}
                  />
                </>
              )}
            </div>
          </div>
        </div>
        <div className="background-100 pt-55 pb-55">
          <div className="container">
            <Brand2 />
          </div>
        </div>
      </section>
    </>
  );
}
