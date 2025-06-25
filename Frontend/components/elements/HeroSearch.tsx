'use client'
import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function HeroSearch({
	condition,
	handleSearch,
}: {
	condition: 'all' | 'New' | 'Used'
	handleSearch: (params: {
		brand?: string
		modelCar?: string
		fuelType?: string
		transmission?: string
		carType?: string
	}) => void
}) {
	const router = useRouter()
	const searchParams = useSearchParams()

	const [filters, setFilters] = useState({
		brands: [],
		models: [],
		fuelTypes: [],
		transmissions: [],
	})

	const [selectedFilters, setSelectedFilters] = useState({
		brand: '',
		modelCar: '',
		fuelType: '',
		transmission: '',
	})

	// ✅ Set default selected filters from URL
	useEffect(() => {
		const brand = searchParams.get('brand') || ''
		const modelCar = searchParams.get('modelCar') || ''
		const fuelType = searchParams.get('fuelType') || ''
		const transmission = searchParams.get('transmission') || ''
		setSelectedFilters({ brand, modelCar, fuelType, transmission })
	}, [searchParams])

	// ✅ Fetch available filter options based on condition
	useEffect(() => {
		fetch(`http://localhost:5000/cars/filters?condition=${condition}`)
			.then(res => res.json())
			.then(data => setFilters(data))
	}, [condition])

	// ✅ Update URL and filter state on select change
	const updateFilters = (name: string, value: string) => {
		const newFilters = {
			...selectedFilters,
			[name]: value,
		}

		setSelectedFilters(newFilters)

		const query = new URLSearchParams()

		if (condition !== 'all') {
			query.set('condition', condition)
		}

		Object.entries(newFilters).forEach(([key, val]) => {
			if (val && val.trim() !== '') {
				query.set(key, val)
			}
		})

		router.push(`/inventory?${query.toString()}`)
	}

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const { name, value } = e.target
		updateFilters(name, value)
	}

	return (
		<div className="container py-4">
			<div className="d-flex flex-wrap align-items-end justify-content-between gap-3 bg-white p-4 rounded-3 shadow-sm">
				{/* All Brands */}
				<div className="flex-grow-1">
					<label className="form-label fw-semibold text-dark">All Brands</label>
					<select className="form-select" name="brand" value={selectedFilters.brand} onChange={handleChange}>
						<option value="">Select</option>
						{filters.brands.map((brand: string) => (
							<option key={brand} value={brand}>
								{brand}
							</option>
						))}
					</select>
				</div>

				{/* All Models */}
				<div className="flex-grow-1">
					<label className="form-label fw-semibold text-dark">All Models</label>
					<select className="form-select" name="modelCar" value={selectedFilters.modelCar} onChange={handleChange}>
						<option value="">Select</option>
						{filters.models.map((model: string) => (
							<option key={model} value={model}>
								{model}
							</option>
						))}
					</select>
				</div>

				{/* Fuel Type */}
				<div className="flex-grow-1">
					<label className="form-label fw-semibold text-dark">Fuel Type</label>
					<select className="form-select" name="fuelType" value={selectedFilters.fuelType} onChange={handleChange}>
						<option value="">Select</option>
						{filters.fuelTypes.map((fuel: string) => (
							<option key={fuel} value={fuel}>
								{fuel}
							</option>
						))}
					</select>
				</div>

				{/* Transmission */}
				<div className="flex-grow-1">
					<label className="form-label fw-semibold text-dark">Transmission</label>
					<select className="form-select" name="transmission" value={selectedFilters.transmission} onChange={handleChange}>
						<option value="">Select</option>
						{filters.transmissions.map((trans: string) => (
							<option key={trans} value={trans}>
								{trans}
							</option>
						))}
					</select>
				</div>
			</div>
		</div>
	)
}
