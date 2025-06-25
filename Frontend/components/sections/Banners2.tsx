
import Link from "next/link"

export default function Banners2() {
	return (
		<>

			<section className="section-box-banner-2 background-body py-50">
				<div className="container">
					<div className="row">
						<div className="col-lg-6">
							<div className="box-banner-1 px-5 position-relative rounded-12 overflow-hidden">
								<div className="banner-info position-relative z-1 py-5">
									<div className="banner-title">
										<h5 className="text-white">Looking to Export car?</h5>
									</div>
									<p className="banner-text text-white text-md-regular py-3">
										Discover your ideal Export car for every adventure, <br className="d-none d-lg-block" />
										whether it's a road trip or business travel
									</p>
									<div className="banner-button pt-3">
										<Link className="btn btn-prima" href="/inventory">
											Get Started Now
											<svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path d="M8 15L15 8L8 1M15 8L1 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
											</svg>
										</Link>
									</div>
								</div>
							</div>
						</div>
						<div className="col-lg-6">
							<div className="box-banner-2 px-5 position-relative rounded-12 overflow-hidden mt-lg-0 mt-4">
								<div className="banner-info position-relative z-1 py-5">
									<div className="banner-title">
										<h5 className="text-white">Looking to Modify your car?</h5>
									</div>
									<p className="banner-text text-white text-md-regular py-3">
										Find your matching customize parts for your vehicle <br className="d-none d-lg-block" />
										Spares Parts and accessoiries
									</p>
									<div className="banner-button pt-3">
										<Link className="btn btn-prima" href="/inventory">
											Get Started Now
											<svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path d="M8 15L15 8L8 1M15 8L1 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
											</svg>
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}
