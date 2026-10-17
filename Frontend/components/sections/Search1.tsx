'use client'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import HeroSearch from '../elements/HeroSearch'

export default function Search1() {
	const searchParams = useSearchParams()
	const router = useRouter()
	const initialCondition = (searchParams.get('condition') as 'all' | 'New' | 'Used') || 'all'
	const [condition, setCondition] = useState<'all' | 'New' | 'Used'>(initialCondition)

	// ✅ When tab is clicked, update URL instantly
	const handleTabClick = (type: 'all' | 'New' | 'Used') => {
		setCondition(type)

		const query = new URLSearchParams(window.location.search)

		if (type === 'all') {
			query.delete('condition')
		} else {
			query.set('condition', type)
		}

		router.push(`/inventory?${query.toString()}`)
	}

	// 🔍 For advanced form search
	const handleSearch = (params: {
		brand?: string
		modelCar?: string
		fuelType?: string
		transmission?: string
		carType?: string
	}) => {
		const query = new URLSearchParams()

		// Include condition if selected
		if (condition !== 'all') {
			query.set('condition', condition)
		}

		Object.entries(params).forEach(([key, value]) => {
			if (value && value.trim() !== '') {
				query.set(key, value)
			}
		})

		router.push(`/inventory?${query.toString()}`)
	}

	// 🔄 Reset everything
	const handleResetFilters = () => {
		setCondition('all')
		router.push('/inventory')
	}

	return (
		<section className="box-section box-search-advance-home10 background-100 pt-30">
			<div className="container">
				<div className="box-search-advance background-card wow">
					{/* Tabs */}
					<div className="box-top-search d-flex justify-content-between align-items-center">
						<div className="left-top-search d-flex gap-2">
							{['all', 'New', 'Used'].map((type) => (
								<button
									key={type}
									className={`category-link text-sm-bold btn-click ${condition === type ? 'active' : ''}`}
									onClick={() => handleTabClick(type as 'all' | 'New' | 'Used')}
								>
									{type === 'all' ? 'All cars' : `${type.charAt(0).toUpperCase() + type.slice(1)} cars`}
								</button>
							))}
							{/* ✅ Reset Button */}
							<button
								onClick={handleResetFilters}
								className="btn btn-sm text-sm-medium  btn-secondary"
								style={{ padding: '3px 8px', borderRadius: '6px' }}
							>
								Reset Filters
							</button>
						</div>
						<div className="right-top-search d-none d-md-flex">
							<Link className="text-sm-medium need-some-help" href="/contact">
								Need help?
							</Link>
						</div>
					</div>

					{/* Filter Form */}
					<HeroSearch condition={condition} handleSearch={handleSearch} />
				</div>
			</div>
		</section>
	)
}
