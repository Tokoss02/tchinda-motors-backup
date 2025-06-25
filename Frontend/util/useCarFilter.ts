'use client'
import { ChangeEvent, useState, useMemo } from "react";
import { Car, Filter } from "@/types/carvalue";

type SortCriteria = "name" | "price";

const useCarFilter = (carsData: Car[]) => {
  const [filter, setFilter] = useState<Filter>({
    name: [],
    fuelType: [],
    amenities: [],
    priceRange: [0, 100000000],
    carType: [],
  });

  const [sortCriteria, setSortCriteria] = useState<SortCriteria>("name");
  const [itemsPerPage, setItemsPerPage] = useState<number>(20);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Memoize the unique filters (calculated once when carsData changes)
  const uniqueNames = useMemo(() => [...new Set(carsData.map((car) => car.name || car.modelCar))], [carsData]);
  const uniqueFuelTypes = useMemo(() => [...new Set(carsData.map((car) => car.fuelType))], [carsData]);
  const uniqueAmenities = useMemo(() => [...new Set(carsData.map((car) => car.amenities))], [carsData]);
  const uniqueCarTypes = useMemo(() => [...new Set(carsData.map((car) => car.carType))], [carsData]);

  // Filtered cars (depends on carsData + filters)
  const filteredCars = useMemo(() => {
    return carsData.filter((car) => {
      return (
        (filter.name.length === 0 || filter.name.includes(car.name || car.modelCar)) &&
        (filter.fuelType.length === 0 || filter.fuelType.includes(car.fuelType)) &&
        (car.price >= filter.priceRange[0] && car.price <= filter.priceRange[1]) &&
        (filter.carType.length === 0 || filter.carType.includes(car.carType))
      );
    });
  }, [carsData, filter]);

  // Sorted cars (depends on filteredCars + sortCriteria)
  const sortedCars = useMemo(() => {
    return [...filteredCars].sort((a, b) => {
      if (sortCriteria === "name") {
        const aName = a.name || a.modelCar || "";
        const bName = b.name || b.modelCar || "";
        return aName.localeCompare(bName);
      } else if (sortCriteria === "price") {
        return a.price - b.price;
      }
      return 0;
    });
  }, [filteredCars, sortCriteria]);

  // Pagination
  const totalPages = Math.ceil(sortedCars.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedCars = useMemo(() => sortedCars.slice(startIndex, endIndex), [sortedCars, startIndex, endIndex]);

  // Checkbox change
  const handleCheckboxChange = (field: keyof Filter, value: string | number) => (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setFilter((prevFilter) => {
      const values = prevFilter[field] as (string | number)[];
      if (checked) {
        return { ...prevFilter, [field]: [...values, value] };
      } else {
        return {
          ...prevFilter,
          [field]: values.filter((item) => item !== value),
        };
      }
    });
  };

  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortCriteria(e.target.value as SortCriteria);
  };

  const handlePriceRangeChange = (values: [number, number]) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      priceRange: values,
    }));
  };

  const handleItemsPerPageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleClearFilters = () => {
    setFilter({
      name: [],
      fuelType: [],
      amenities: [],
      priceRange: [0, 500],
      carType: [],
    });
    setSortCriteria("name");
    setItemsPerPage(20);
    setCurrentPage(1);
  };

  const startItemIndex = (currentPage - 1) * itemsPerPage + 1;
  const endItemIndexReal = Math.min(startItemIndex + itemsPerPage - 1, sortedCars.length);

  return {
    filter,
    setFilter,
    sortCriteria,
    setSortCriteria,
    itemsPerPage,
    setItemsPerPage,
    currentPage,
    setCurrentPage,
    uniqueNames,
    uniqueFuelTypes,
    uniqueAmenities,
    uniqueCarTypes,
    filteredCars,
    sortedCars,
    totalPages,
    startIndex,
    endIndex,
    paginatedCars,
    handleCheckboxChange,
    handleSortChange,
    handlePriceRangeChange,
    handleItemsPerPageChange,
    handlePageChange,
    handlePreviousPage,
    handleNextPage,
    handleClearFilters,
    startItemIndex,
    endItemIndex: endItemIndexReal,
  };
};

export default useCarFilter;
