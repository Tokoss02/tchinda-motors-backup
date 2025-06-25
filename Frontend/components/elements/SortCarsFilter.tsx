'use client'


export default function SortCarsFilter({
	itemsPerPage,
	handleItemsPerPageChange,
	 }: any) {
	return (
		<>
			<div className="row align-items-center">
				<div className="col-xl-4 col-md-4 mb-10 text-lg-start text-center">

				</div>
				<div className="col-xl-8 col-md-8 mb-10 text-lg-end text-center">
					<div className="box-item-sort">
						<div className="item-sort border-1"><span className="text-xs-medium neutral-500 mr-5">Show</span>
							<select value={itemsPerPage} onChange={handleItemsPerPageChange}>
								<option value={20}>20</option>
								<option value={40}>40</option>
								<option value={80}>80</option>
								<option value={100}>100</option>
							</select>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
