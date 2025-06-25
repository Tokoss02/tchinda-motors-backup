//Public Car Listing Page

'use client'
import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import CarCard from '@/components/elements/carcard/CarCard'
import Layout from "@/components/layout/Layout"
import SortCarsFilter from '@/components/elements/SortCarsFilter'
import ByPagination from '@/components/Filter/ByPagination'
import useCarFilter from '@/util/useCarFilter'
import Search1 from '@/components/sections/Search1'
import { useCarActions } from '@/hooks/usecarActions'
import Brand2 from '@/components/sections/Brand2'
import { Car } from '@/types/carvalue'
import axios from 'axios';
import { Setting } from '@/types/setting';

export default function CarsList() {
  const searchParams = useSearchParams()
  const { cars: allCars, isLoading, error } = useCarActions()
  const [filteredCars, setFilteredCars] = useState<Car[]>([])
  const [settings, setSettings] = useState<Setting | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axios.get<Setting>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/settings/home/header`);
        setSettings(res.data);
      } catch (err) {
        console.error("Failed to load settings", err);
      }
    };
    fetchSettings();
  }, []);

  useEffect(() => {
    const brand = searchParams.get('brand') || ''
    const modelCar = searchParams.get('modelCar') || ''
    const fuelType = searchParams.get('fuelType') || ''
    const transmission = searchParams.get('transmission') || ''
    const condition = searchParams.get('condition') || 'all'

    const filtered = allCars.filter((car) => {
      return (
        (!brand || car.brand.toLowerCase().includes(brand.toLowerCase())) &&
        (!modelCar || car.modelCar.toLowerCase().includes(modelCar.toLowerCase())) &&
        (!fuelType || car.fuelType === fuelType) &&
        (!transmission || car.transmission === transmission) &&
        (condition === 'all' || car.condition === condition)
      )
    })

    setFilteredCars(filtered)
  }, [allCars, searchParams])

  const {
   
    currentPage,
    totalPages,
    paginatedCars,
    handleItemsPerPageChange,
    handlePageChange,
    handlePreviousPage,
    handleNextPage,
  } = useCarFilter(filteredCars)

  return (
    <>
      <Layout footerStyle={1}>
        <div>
          <div className="page-header-2 pt-30">
            <div className="custom-container position-relative mx-auto">
              <div className="bg-overlay rounded-12 overflow-hidden">
                <img
                  className="w-100 h-100 img-fluid img-banner"
                  src={settings?.imageUrl || "/assets/imgs/page-header/banner6.png"}
                  alt="Tokoss Motors"
                />
              </div>
              <div className="container position-absolute z-1 top-50 start-50 pb-70 translate-middle text-center">
                <h2 className="text-white mt-4">{settings?.heading || "Find the Car That Moves You"}</h2>
                <span className="text-white text-lg-medium">{settings?.subheading || "Search, Buy and Export"}</span>
              </div>
            </div>
          </div>

          {/* search 1 */}
          <Search1 />

          {/* cars-listing-1 */}
          <section className="section-box pt-50 background-body">
            <div className="container">
              <div className="row align-items-end">
                <div className="col-md-9 mb-30 wow ">
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
                        <SortCarsFilter
                          handleItemsPerPageChange={handleItemsPerPageChange}
                        />
                      </div>

                      <div className="box-grid-tours wow">
                        <div className="row g-3">
                          {paginatedCars.map((car) => (
                            <div className="col-6 col-md-4 col-lg-3" key={car._id}>
                              <CarCard car={car} />
                            </div>
                          ))}
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
        </div>
      </Layout>
    </>
  )
}
