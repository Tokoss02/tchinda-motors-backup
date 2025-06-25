'use client';
import { useState, useMemo } from 'react';
import SortCarsFilter from '@/components/elements/SortCarsFilter';
import CarCard from '@/components/elements/carcard/CarCard';
import ByPagination from '@/components/Filter/ByPagination';
import useCarFilter from '@/util/useCarFilter';
import { Car } from '@/types/carvalue';

export default function BrandCarFilterClient({ cars }: { cars: Car[] }) {
	const [selectedModel, setSelectedModel] = useState<string>('all');

	const models = useMemo(() => {
		const unique = Array.from(new Set(cars.map(car => car.modelCar)));
		return ['all', ...unique];
	}, [cars]);

	const filteredCars = useMemo(() => {
		return selectedModel === 'all'
			? cars
			: cars.filter(car => car.modelCar === selectedModel);
	}, [selectedModel, cars]);

	const {
		sortCriteria,
		itemsPerPage,
		currentPage,
		sortedCars,
		totalPages,
		paginatedCars,
		handleSortChange,
		handleItemsPerPageChange,
		handlePageChange,
		handlePreviousPage,
		handleNextPage,
		handleClearFilters,
		startItemIndex,
		endItemIndex,
	} = useCarFilter(filteredCars); // ✅ FIXED HERE

	return (
		<>
			<div className="box-filters mb-25 pb-5 border-bottom border-1">
				<SortCarsFilter
					sortCriteria={sortCriteria}
					handleSortChange={handleSortChange}
					itemsPerPage={itemsPerPage}
					handleItemsPerPageChange={handleItemsPerPageChange}
					handleClearFilters={handleClearFilters}
					startItemIndex={startItemIndex}
					endItemIndex={endItemIndex}
					sortedCars={sortedCars}
				/>

				<div className="mb-3">
					<label htmlFor="modelFilter" className="form-label">Filter by Model:</label>
					<select
						id="modelFilter"
						className="form-select"
						value={selectedModel}
						onChange={(e) => setSelectedModel(e.target.value)}
					>
						{models.map((model, idx) => (
							<option key={idx} value={model}>
								{model}
							</option>
						))}
					</select>
				</div>
			</div>

			<div className="box-grid-tours wow">
				<div className="row">
					{paginatedCars.map((car) => (
						<div className="col-lg-3 col-md-6" key={car._id}>
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
	);
}
