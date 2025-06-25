// components/ModelCarFilterClient.tsx
'use client';



import SortCarsFilter from '@/components/elements/SortCarsFilter';
import CarCard from '@/components/elements/carcard/CarCard';
import ByPagination from '@/components/Filter/ByPagination';
import { Car } from '@/types/carvalue';
import useCarFilter from '@/util/useCarFilter';

export default function ModelCarFilterClient({ cars }: { cars: Car[] }) {
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
	} = useCarFilter(cars);

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
			</div>

			<div className="box-grid-tours wow fadeIn">
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
