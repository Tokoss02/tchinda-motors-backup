'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'

// Import the car model if needed
// import { Car } from '@/types/myCarValue' // Adjust path as needed

interface CarTypeCount {
	carType: string
	count: number
}

export default function Categories2() {
	const [carTypes, setCarTypes] = useState<CarTypeCount[]>([])

	useEffect(() => {
		axios.get<CarTypeCount[]>("http://localhost:5000/cars/count-by-type")
			.then((res) => {
				console.log("Fetched Car Types:", res.data)
				setCarTypes(res.data)
			})
			.catch((err) => console.error("API Error:", err))
	}, [])

	// Images for each car type (lowercase keys for safety)
	const imageMap: { [key: string]: string } = {
		suv: '/assets/imgs/categories/categories-2/SUV.png',
		sedan: '/assets/imgs/categories/categories-2/sedan.png',
		pickup: '/assets/imgs/categories/categories-2/pickup.png',
		hatchback: '/assets/imgs/categories/categories-2/hatchback.png',
		truck: '/assets/imgs/categories/categories-2/truck.png',
		minivan: '/assets/imgs/categories/categories-2/minivan.png',
		bus: '/assets/imgs/categories/categories-2/bus.png',
		van: '/assets/imgs/categories/categories-2/van.png',
		crossover: '/assets/imgs/categories/categories-2/crossover.png',
		luxury: '/assets/imgs/categories/categories-2/luxury.png',
		coupe: '/assets/imgs/categories/categories-2/coupe.png',
		jeep: '/assets/imgs/categories/categories-2/jeep.png',
	}

	const normalize = (name: string) => name.toLowerCase()

	return (
		<section className="section-box background-body border-bottom">
			<div className="container">
				<div className="row align-items-end mb-40">
					<div className="col-md-8">
						<h3 className="heading-5 py-4 mb-0 neutral-1000">Browse by Type</h3>
					</div>
				</div>

				<div className="row justify-content-center">
					{carTypes.length === 0 ? (
						<div className="col-12 text-center text-danger">No car types found.</div>
					) : (
						carTypes.map((type, index) => {
							const normalized = normalize(type.carType)
							const imageSrc = imageMap[normalized] || '/assets/imgs/categories/categories-2/default.png'

							return (
								<div key={index} className="col-4 col-lg-2 col-md-3 col-sm-4  text-center mb-3 wow" data-wow-delay={`${0.1 * (index + 1)}s`}>
									<div className="card-popular background-100 hover-up position-relative">
										<Link href={`/inventory/category/${normalized}`}>
											<div className="card-image border-0">
												<img src={imageSrc} alt={type.carType} />
											</div>
										</Link>
										
									</div>
									<Link className="card-title text-lg-bold neutral-1000" href={`/inventory/category/${normalized}`}>
										{type.carType}
									</Link>
								</div>
							)
						})
					)}
				</div>
			</div>
		</section>
	)
}
