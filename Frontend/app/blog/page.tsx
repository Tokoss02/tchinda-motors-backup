'use client'
import Layout from "@/components/layout/Layout"
import { swiperGroup1 } from '@/util/swiperOptions'
import Link from "next/link"
import { Swiper, SwiperSlide } from "swiper/react"
export default function BlogGrid() {

	return (
		<>	<Layout footerStyle={1}>
				<section className="box-section background-body pt-05">
					<div className="page-header pt-30 background-body">
						<div className="custom-container position-relative mx-auto">
							<div className="bg-overlay rounded-12 overflow-hidden">
								<img className="w-100 h-100 img-banner" src="/assets/imgs/page-header/banner.png" alt="Tokoss Motors" />
							</div>
							<div className="container position-absolute z-1 top-50 start-50 translate-middle">
								<h2 className="text-white">Blog News</h2>
								<span className="text-white text-xl-medium">Get the latest news</span>
							</div>
							<div className="background-body position-absolute z-1 top-100 start-50 translate-middle px-3 py-2 rounded-12 border d-flex gap-3 @@navigation-page">
								<Link href="/" className="neutral-700 text-md-medium">Home</Link>
								<span>
									<img src="/assets/imgs/template/icons/arrow-right.svg" alt="Tokoss Motors" />
								</span>
								<Link href="#" className="neutral-1000 text-md-bold">Blog post</Link>
							</div>
						</div>
					</div>
					<div className="container">
						<div className="d-flex flex-wrap align-items-center justify-content-center gap-3 pt-55 pb-60">
							<span className="text-md-bold neutral-1000"> CATEGORY: </span>
							<Link href="#" className="btn btn-white px-3 py-2">Industry News</Link>
							<Link href="#" className="btn btn-white px-3 py-2">Awards</Link>
							<Link href="#" className="btn btn-white px-3 py-2">Company celebration</Link>
							<Link href="#" className="btn btn-white px-3 py-2">Car Review</Link>
							<Link href="#" className="btn btn-white px-3 py-2">Outdoors</Link>
							<Link href="#" className="btn btn-white px-3 py-2">Business Meeting</Link>
						</div>
						<h3 className="text-center mb-65 neutral-1000">Latest News</h3>
						<div className="row">
							<div className="col-lg-4 col-md-6 col-12">
								<div className="card-news background-card hover-up mb-4">
									<div className="card-image">
										<img src="/assets/imgs/blog/blog-grid/img-3.png" alt="Tokoss Motors" />
									</div>
									<div className="card-info">
										<label className="bg-2 rounded-12 position-absolute top-0 end-0 translate-middle-y px-3 py-2 me-4 text-sm-bold">Car Review</label>
										<div className="card-meta"><span className="post-date neutral-1000">18 Sep 2024</span><span className="post-time neutral-1000">6 mins</span><span className="post-comment neutral-1000">38 comments</span></div>
										<div className="card-title"><Link className="text-xl-bold neutral-1000" href="/blog-details">The Continued Growth of Delivery and Ride share-2024</Link></div>
										<div className="card-program">
											<div className="endtime">
												<div className="card-button"><Link className="btn btn-gray" href="/blog-details">Keep Reading</Link></div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="col-lg-4 col-md-6 col-12">
								<div className="card-news background-card hover-up mb-4">
									<div className="card-image">
										<img src="/assets/imgs/blog/blog-grid/img-4.png" alt="Tokoss Motors" />
									</div>
									<div className="card-info">
										<label className="bg-2 rounded-12 position-absolute top-0 end-0 translate-middle-y px-3 py-2 me-4 text-sm-bold">Travel Tips</label>
										<div className="card-meta"><span className="post-date neutral-1000">18 Sep 2024</span><span className="post-time neutral-1000">6 mins</span><span className="post-comment neutral-1000">38 comments</span></div>
										<div className="card-title"><Link className="text-xl-bold neutral-1000" href="/blog-details">The Continued Growth of Delivery and Ride share-2024</Link></div>
										<div className="card-program">
											<div className="endtime">
												<div className="card-button"><Link className="btn btn-gray" href="/blog-details">Keep Reading</Link></div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="col-lg-4 col-md-6 col-12">
								<div className="card-news background-card hover-up mb-4">
									<div className="card-image">
										<img src="/assets/imgs/blog/blog-grid/img-5.png" alt="Tokoss Motors" />
									</div>
									<div className="card-info">
										<label className="bg-2 rounded-12 position-absolute top-0 end-0 translate-middle-y px-3 py-2 me-4 text-sm-bold">Industry News</label>
										<div className="card-meta"><span className="post-date neutral-1000">18 Sep 2024</span><span className="post-time neutral-1000">6 mins</span><span className="post-comment neutral-1000">38 comments</span></div>
										<div className="card-title"><Link className="text-xl-bold neutral-1000" href="/blog-details">The Continued Growth of Delivery and Ride share-2024</Link></div>
										<div className="card-program">
											<div className="endtime">
												<div className="card-button"><Link className="btn btn-gray" href="/blog-details">Keep Reading</Link></div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="col-lg-4 col-md-6 col-12">
								<div className="card-news background-card hover-up mb-4">
									<div className="card-image">
										<img src="/assets/imgs/blog/blog-grid/img-6.png" alt="Tokoss Motors" />
									</div>
									<div className="card-info">
										<label className="bg-2 rounded-12 position-absolute top-0 end-0 translate-middle-y px-3 py-2 me-4 text-sm-bold">Car Updates</label>
										<div className="card-meta"><span className="post-date neutral-1000">18 Sep 2024</span><span className="post-time neutral-1000">6 mins</span><span className="post-comment neutral-1000">38 comments</span></div>
										<div className="card-title"><Link className="text-xl-bold neutral-1000" href="/blog-details">The Continued Growth of Delivery and Ride share-2024</Link></div>
										<div className="card-program">
											<div className="endtime">
												<div className="card-button"><Link className="btn btn-gray" href="/blog-details">Keep Reading</Link></div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="col-lg-4 col-md-6 col-12">
								<div className="card-news background-card hover-up mb-4">
									<div className="card-image">
										<img src="/assets/imgs/blog/blog-grid/img-7.png" alt="Tokoss Motors" />
									</div>
									<div className="card-info">
										<label className="bg-2 rounded-12 position-absolute top-0 end-0 translate-middle-y px-3 py-2 me-4 text-sm-bold">Export Advice</label>
										<div className="card-meta"><span className="post-date neutral-1000">18 Sep 2024</span><span className="post-time neutral-1000">6 mins</span><span className="post-comment neutral-1000">38 comments</span></div>
										<div className="card-title"><Link className="text-xl-bold neutral-1000" href="/blog-details">Top 10 Travel Hacks for Budget-Conscious Adventurers</Link></div>
										<div className="card-program">
											<div className="endtime">
												<div className="card-button"><Link className="btn btn-gray" href="/blog-details">Keep Reading</Link></div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="col-lg-4 col-md-6 col-12">
								<div className="card-news background-card hover-up mb-4">
									<div className="card-image">
										<img src="/assets/imgs/blog/blog-grid/img-8.png" alt="Tokoss Motors" />
									</div>
									<div className="card-info">
										<label className="bg-2 rounded-12 position-absolute top-0 end-0 translate-middle-y px-3 py-2 me-4 text-sm-bold">Road Trips</label>
										<div className="card-meta"><span className="post-date neutral-1000">18 Sep 2024</span><span className="post-time neutral-1000">6 mins</span><span className="post-comment neutral-1000">38 comments</span></div>
										<div className="card-title"><Link className="text-xl-bold neutral-1000" href="/blog-details">Top 10 Travel Hacks for Budget-Conscious Adventurers</Link></div>
										<div className="card-program">
											<div className="endtime">
												<div className="card-button"><Link className="btn btn-gray" href="/blog-details">Keep Reading</Link></div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="col-lg-4 col-md-6 col-12">
								<div className="card-news background-card hover-up mb-4">
									<div className="card-image">
										<img src="/assets/imgs/blog/blog-grid/img-9.png" alt="Tokoss Motors" />
									</div>
									<div className="card-info">
										<label className="bg-2 rounded-12 position-absolute top-0 end-0 translate-middle-y px-3 py-2 me-4 text-sm-bold">Car Review</label>
										<div className="card-meta"><span className="post-date neutral-1000">18 Sep 2024</span><span className="post-time neutral-1000">6 mins</span><span className="post-comment neutral-1000">38 comments</span></div>
										<div className="card-title"><Link className="text-xl-bold neutral-1000" href="/blog-details">Top 10 Travel Hacks for Budget-Conscious Adventurers</Link></div>
										<div className="card-program">
											<div className="endtime">
												<div className="card-button"><Link className="btn btn-gray" href="/blog-details">Keep Reading</Link></div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="col-lg-4 col-md-6 col-12">
								<div className="card-news background-card hover-up mb-4">
									<div className="card-image">
										<img src="/assets/imgs/blog/blog-grid/img-10.png" alt="Tokoss Motors" />
									</div>
									<div className="card-info">
										<label className="bg-2 rounded-12 position-absolute top-0 end-0 translate-middle-y px-3 py-2 me-4 text-sm-bold">Car Review</label>
										<div className="card-meta"><span className="post-date neutral-1000">18 Sep 2024</span><span className="post-time neutral-1000">6 mins</span><span className="post-comment neutral-1000">38 comments</span></div>
										<div className="card-title"><Link className="text-xl-bold neutral-1000" href="/blog-details">Top 10 Travel Hacks for Budget-Conscious Adventurers</Link></div>
										<div className="card-program">
											<div className="endtime">
												<div className="card-button"><Link className="btn btn-gray" href="/blog-details">Keep Reading</Link></div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="col-lg-4 col-md-6 col-12">
								<div className="card-news background-card hover-up mb-4">
									<div className="card-image">
										<img src="/assets/imgs/blog/blog-grid/img-11.png" alt="Tokoss Motors" />
									</div>
									<div className="card-info">
										<label className="bg-2 rounded-12 position-absolute top-0 end-0 translate-middle-y px-3 py-2 me-4 text-sm-bold">Discovery</label>
										<div className="card-meta"><span className="post-date neutral-1000">18 Sep 2024</span><span className="post-time neutral-1000">6 mins</span><span className="post-comment neutral-1000">38 comments</span></div>
										<div className="card-title"><Link className="text-xl-bold neutral-1000" href="/blog-details">The Continued Growth of Delivery and Ride share-2024</Link></div>
										<div className="card-program">
											<div className="endtime">
												<div className="card-button"><Link className="btn btn-gray" href="/blog-details">Keep Reading</Link></div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="col-lg-4 col-md-6 col-12">
								<div className="card-news background-card hover-up mb-4">
									<div className="card-image">
										<img src="/assets/imgs/blog/blog-grid/img-12.png" alt="Tokoss Motors" />
									</div>
									<div className="card-info">
										<label className="bg-2 rounded-12 position-absolute top-0 end-0 translate-middle-y px-3 py-2 me-4 text-sm-bold">Industry News</label>
										<div className="card-meta"><span className="post-date neutral-1000">18 Sep 2024</span><span className="post-time neutral-1000">6 mins</span><span className="post-comment neutral-1000">38 comments</span></div>
										<div className="card-title"><Link className="text-xl-bold neutral-1000" href="/blog-details">The Continued Growth of Delivery and Ride share-2024</Link></div>
										<div className="card-program">
											<div className="endtime">
												<div className="card-button"><Link className="btn btn-gray" href="/blog-details">Keep Reading</Link></div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="col-lg-4 col-md-6 col-12">
								<div className="card-news background-card hover-up mb-4">
									<div className="card-image">
										<img src="/assets/imgs/blog/blog-grid/img-13.png" alt="Tokoss Motors" />
									</div>
									<div className="card-info">
										<label className="bg-2 rounded-12 position-absolute top-0 end-0 translate-middle-y px-3 py-2 me-4 text-sm-bold">Industry News</label>
										<div className="card-meta"><span className="post-date neutral-1000">18 Sep 2024</span><span className="post-time neutral-1000">6 mins</span><span className="post-comment neutral-1000">38 comments</span></div>
										<div className="card-title"><Link className="text-xl-bold neutral-1000" href="/blog-details">The Continued Growth of Delivery and Ride share-2024</Link></div>
										<div className="card-program">
											<div className="endtime">
												<div className="card-button"><Link className="btn btn-gray" href="/blog-details">Keep Reading</Link></div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="col-lg-4 col-md-6 col-12">
								<div className="card-news background-card hover-up mb-4">
									<div className="card-image">
										<img src="/assets/imgs/blog/blog-grid/img-14.png" alt="Tokoss Motors" />
									</div>
									<div className="card-info">
										<label className="bg-2 rounded-12 position-absolute top-0 end-0 translate-middle-y px-3 py-2 me-4 text-sm-bold">Industry News</label>
										<div className="card-meta"><span className="post-date neutral-1000">18 Sep 2024</span><span className="post-time neutral-1000">6 mins</span><span className="post-comment neutral-1000">38 comments</span></div>
										<div className="card-title"><Link className="text-xl-bold neutral-1000" href="/blog-details">The Continued Growth of Delivery and Ride share-2024</Link></div>
										<div className="card-program">
											<div className="endtime">
												<div className="card-button"><Link className="btn btn-gray" href="/blog-details">Keep Reading</Link></div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="d-flex justify-content-center">
							<nav aria-label="Page navigation example">
								<ul className="pagination">
									<li className="page-item">
										<Link className="page-link" href="#" aria-label="Previous">
											<span aria-hidden="true">
												<svg width={12} height={12} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M6.00016 1.33325L1.3335 5.99992M1.3335 5.99992L6.00016 10.6666M1.3335 5.99992H10.6668" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
												</svg>
											</span>
										</Link>
									</li>
									<li className="page-item"><Link className="page-link" href="#">1</Link></li>
									<li className="page-item"><Link className="page-link" href="#">2</Link></li>
									<li className="page-item"><Link className="page-link" href="#">3</Link></li>
									<li className="page-item"><Link className="page-link" href="#">4</Link></li>
									<li className="page-item"><Link className="page-link" href="#">5</Link></li>
									<li className="page-item"><Link className="page-link" href="#">...</Link></li>
									<li className="page-item">
										<Link className="page-link active" href="#" aria-label="Next">
											<span aria-hidden="true">
												<svg width={12} height={12} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M5.99967 10.6666L10.6663 5.99992L5.99968 1.33325M10.6663 5.99992L1.33301 5.99992" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
												</svg>
											</span>
										</Link>
									</li>
								</ul>
							</nav>
						</div>
					
					</div>
				</section>
				</Layout>
		</>
	)
}