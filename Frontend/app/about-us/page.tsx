'use client'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useState } from 'react'
import ModalVideo from 'react-modal-video'
export default function AboutUs() {
	const [isOpen, setOpen] = useState(false)
	const [isAccordion, setIsAccordion] = useState(1)

	const handleAccordion = (key: any) => {
		setIsAccordion(prevState => prevState === key ? null : key)
	}
	return (
		<>
			<Layout footerStyle={1}>
				<div>
					<div className="page-header pt-30 background-body">
						<div className="custom-container position-relative mx-auto">
							<div className="bg-overlay rounded-12 overflow-hidden">
								<img className="w-100 h-100 img-banner" src="/assets/imgs/page-header/banner.png" alt="Tokoss Motors" />
							</div>
							<div className="container position-absolute z-1 top-50 start-50 translate-middle">
								<h2 className="text-white">About Us</h2>
								<span className="text-white text-xl-medium">Get the latest news, updates and tips</span>
							</div>
							<div className="background-body position-absolute z-1 top-100 start-50 translate-middle px-3 py-2 rounded-12 border d-flex gap-3 @@navigation-page">
								<Link href="/" className="neutral-700 text-md-medium">Home</Link>
								<span>
									<img src="/assets/imgs/template/icons/arrow-right.svg" alt="Tokoss Motors" />
								</span>
								<Link href="#" className="neutral-1000 text-md-bold">About Us</Link>
							</div>
						</div>
					</div>
					{/* section-1 */}
					<section className="section-1 py-96 background-body">
						<div className="container">
							<div className="row pb-50">
								<div className="col-lg-4">
									<h3 className="neutral-1000">
										The Future of <br />
										<span className="text-primary">Car Export </span>
										is Here
									</h3>
								</div>
								<div className="col-lg-7 offset-lg-1">
									<p className="text-lg-medium neutral-500">Welcome to Tokoss Motors, your premier destination for reliable and seamless car exports worldwide.</p>
								</div>
							</div>
							<div className="row g-4">
								<div className="col-lg-4 col-md-6">
									<div className="box-image rounded-12 position-relative overflow-hidden">
										<img className="rounded-12" src="/assets/imgs/section-1/img-1.png" alt="Tokoss Motors" />
										<div className="box-tag bg-white p-3 d-flex position-absolute bottom-0 end-0 rounded-12 m-3">
											<span className="text-dark fs-72 me-3">12</span>
											<h6>
												Industry <br />
												Experts
											</h6>
										</div>
									</div>
								</div>
								<div className="col-lg-4 col-md-6">
									<div className="box-image rounded-12 position-relative overflow-hidden">
										<img className="rounded-12" src="/assets/imgs/section-1/img-2.png" alt="Tokoss Motors" />
									</div>
								</div>
								<div className="col-lg-4 col-12">
									<div className="d-flex flex-column gap-4 align-self-stretch h-100">
										<div className="box-tag background-brand-2 p-5 d-flex rounded-12">
											<span className="text-dark fs-96 me-3">05</span>
											<h4>
												Years in <br />
												Business
											</h4>
										</div>
										<img className="rounded-12" src="/assets/imgs/section-1/img-3.png" alt="Tokoss Motors" />
									</div>
								</div>
							</div>
						</div>
					
					</section>
					{/* team 1 */}
					<section className="section-team-1 py-96 background-body border-top border-bottom">
						<div className="container">
							<div className="row align-items-center justify-content-center">
								<div className="col-xl-6 col-lg-7 col-md-9 col-sm-11">
									<div className="text-center mb-5">
										<span className="text-xl-medium neutral-500">Tokoss Teams</span>
										<h3 className="section-title neutral-1000">Meet Our Agents</h3>
									</div>
								</div>
							</div>
							<div className="row mt-50">
								<div className="col-lg-3 col-md-4 col-sm-6 col-12">
									<div className="card-news background-card hover-up shadow-2 mb-4 mb-lg-0">
										<div className="card-image">
											<Link href="/dealer-details">
												<img src="/assets/imgs/team/team-1/portrait-1.png" alt="Tokoss Motors" />
											</Link>
										</div>
										<div className="card-info p-4">
											<div className="card-title">
												<Link className="text-xl-bold neutral-1000" href="/dealer-details">
													<h6>Cody Fisher</h6>
												</Link>
												<span className="text-sm-medium neutral-500">CFO (Chief Financial Officer)</span>
											</div>
											<div className="card-program">
												<div className="endtime">
													<div className="card-author d-flex align-items-center gap-2">
														<Link href="#" className="rounded-circle background-100 icon-shape icon icon-sm hover-up">
															<img className="m-0" src="/assets/imgs/team/team-1/icon-1.svg" alt="Tokoss Motors" />
														</Link>
														<Link href="#" className="rounded-circle background-100 icon-shape icon icon-sm hover-up">
															<img className="m-0" src="/assets/imgs/team/team-1/icon-2.svg" alt="Tokoss Motors" />
														</Link>
														<Link href="#" className="rounded-circle background-100 icon-shape icon icon-sm hover-up">
															<img className="m-0" src="/assets/imgs/team/team-1/icon-3.svg" alt="Tokoss Motors" />
														</Link>
														<Link href="#" className="rounded-circle background-100 icon-shape icon icon-sm hover-up">
															<img className="m-0" src="/assets/imgs/team/team-1/icon-4.svg" alt="Tokoss Motors" />
														</Link>
													</div>
													<Link href="/dealer-details" className="rounded-circle background-100 icon-shape icon icon-sm hover-up border icon-shape-arrow">
														<img className="m-0" src="/assets/imgs/team/team-1/arrow-up-right.svg" alt="Tokoss Motors" />
													</Link>
												</div>
											</div>
										</div>
									</div>
								</div>

						

								<div className="col-lg-3 col-md-4 col-sm-6 col-12">
									<div className="card-news background-card hover-up shadow-2 mb-4 mb-lg-0">
										<div className="card-image">
											<Link href="/dealer-details">
												<img src="/assets/imgs/team/team-1/portrait-2.png" alt="Tokoss Motors" />
											</Link>
										</div>
										<div className="card-info p-4">
											<div className="card-title">
												<Link className="text-xl-bold neutral-1000" href="/dealer-details">
													<h6>Darrell Steward</h6>
												</Link>
												<span className="text-sm-medium neutral-500">CEO (Chief Financial Officer)</span>
											</div>
											<div className="card-program">
												<div className="endtime">
													<div className="card-author d-flex align-items-center gap-2">
														<Link href="#" className="rounded-circle background-100 icon-shape icon icon-sm hover-up">
															<img className="m-0" src="/assets/imgs/team/team-1/icon-1.svg" alt="Tokoss Motors" />
														</Link>
														<Link href="#" className="rounded-circle background-100 icon-shape icon icon-sm hover-up">
															<img className="m-0" src="/assets/imgs/team/team-1/icon-2.svg" alt="Tokoss Motors" />
														</Link>
														<Link href="#" className="rounded-circle background-100 icon-shape icon icon-sm hover-up">
															<img className="m-0" src="/assets/imgs/team/team-1/icon-3.svg" alt="Tokoss Motors" />
														</Link>
														<Link href="#" className="rounded-circle background-100 icon-shape icon icon-sm hover-up">
															<img className="m-0" src="/assets/imgs/team/team-1/icon-4.svg" alt="Tokoss Motors" />
														</Link>
													</div>
													<Link href="/dealer-details" className="rounded-circle background-100 icon-shape icon icon-sm hover-up border icon-shape-arrow">
														<img className="m-0" src="/assets/imgs/team/team-1/arrow-up-right.svg" alt="Tokoss Motors" />
													</Link>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="col-lg-3 col-md-4 col-sm-6 col-12">
									<div className="card-news background-card hover-up shadow-2 mb-4 mb-lg-0">
										<div className="card-image">
											<Link href="/dealer-details">
												<img src="/assets/imgs/team/team-1/portrait-3.png" alt="Tokoss Motors" />
											</Link>
										</div>
										<div className="card-info p-4">
											<div className="card-title">
												<Link className="text-xl-bold neutral-1000" href="/dealer-details">
													<h6>Ronald Richards</h6>
												</Link>
												<span className="text-sm-medium neutral-500">COO (Chief Financial Officer)</span>
											</div>
											<div className="card-program">
												<div className="endtime">
													<div className="card-author d-flex align-items-center gap-2">
														<Link href="#" className="rounded-circle background-100 icon-shape icon icon-sm hover-up">
															<img className="m-0" src="/assets/imgs/team/team-1/icon-1.svg" alt="Tokoss Motors" />
														</Link>
														<Link href="#" className="rounded-circle background-100 icon-shape icon icon-sm hover-up">
															<img className="m-0" src="/assets/imgs/team/team-1/icon-2.svg" alt="Tokoss Motors" />
														</Link>
														<Link href="#" className="rounded-circle background-100 icon-shape icon icon-sm hover-up">
															<img className="m-0" src="/assets/imgs/team/team-1/icon-3.svg" alt="Tokoss Motors" />
														</Link>
														<Link href="#" className="rounded-circle background-100 icon-shape icon icon-sm hover-up">
															<img className="m-0" src="/assets/imgs/team/team-1/icon-4.svg" alt="Tokoss Motors" />
														</Link>
													</div>
													<Link href="/dealer-details" className="rounded-circle background-100 icon-shape icon icon-sm hover-up border icon-shape-arrow">
														<img className="m-0" src="/assets/imgs/team/team-1/arrow-up-right.svg" alt="Tokoss Motors" />
													</Link>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="col-lg-3 col-md-4 col-sm-6 col-12">
									<div className="card-news background-card hover-up shadow-2 mb-4 mb-lg-0">
										<div className="card-image">
											<Link href="/dealer-details">
												<img src="/assets/imgs/team/team-1/portrait-4.png" alt="Tokoss Motors" />
											</Link>
										</div>
										<div className="card-info p-4">
											<div className="card-title">
												<Link className="text-xl-bold neutral-1000" href="/dealer-details">
													<h6>Jerome Bell</h6>
												</Link>
												<span className="text-sm-medium neutral-500">CMO (Chief Financial Officer)</span>
											</div>
											<div className="card-program">
												<div className="endtime">
													<div className="card-author d-flex align-items-center gap-2">
														<Link href="#" className="rounded-circle background-100 icon-shape icon icon-sm hover-up">
															<img className="m-0" src="/assets/imgs/team/team-1/icon-1.svg" alt="Tokoss Motors" />
														</Link>
														<Link href="#" className="rounded-circle background-100 icon-shape icon icon-sm hover-up">
															<img className="m-0" src="/assets/imgs/team/team-1/icon-2.svg" alt="Tokoss Motors" />
														</Link>
														<Link href="#" className="rounded-circle background-100 icon-shape icon icon-sm hover-up">
															<img className="m-0" src="/assets/imgs/team/team-1/icon-3.svg" alt="Tokoss Motors" />
														</Link>
														<Link href="#" className="rounded-circle background-100 icon-shape icon icon-sm hover-up">
															<img className="m-0" src="/assets/imgs/team/team-1/icon-4.svg" alt="Tokoss Motors" />
														</Link>
													</div>
													<Link href="/dealer-details" className="rounded-circle background-100 icon-shape icon icon-sm hover-up border icon-shape-arrow">
														<img className="m-0" src="/assets/imgs/team/team-1/arrow-up-right.svg" alt="Tokoss Motors" />
													</Link>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>
					{/* cta 8*/}
					<section className="section-cta-7 background-body py-96">
						<div className="box-cta-6">
							<div className="container">
								<div className="row align-items-center">
									<div className="col-lg-5">
										<Link className="btn btn-signin bg-2 text-dark mb-4" href="#">Our Mission</Link>
										<h4 className="mb-4 neutral-1000">Sell and export car at a fair price. <br />Get started with us today.</h4>
										<p className="text-lg-medium neutral-500 mb-4">Our mission is to make car Export easy, accessible, and affordable for everyone. We believe that exporting a car should be a hassle-free experience, and we're dedicated to ensuring that every customer finds the perfect vehicle for their journey.</p>
										<div className="row">
											<div className="col">
												<ul className="list-ticks-green list-ticks-green-2">
													<li className="neutral-1000 pe-0">Explore a wide range of flexible Export options to suit your needs</li>
													<li className="neutral-1000 pe-0">Comprehensive insurance coverage for complete peace of mind</li>
													<li className="neutral-1000 pe-0">24/7 customer support for assistance anytime, anywhere</li>
												</ul>
											</div>
										</div>
										<Link className="btn btn-primary mt-2" href="/contact">
											Get Started Now
											<svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path d="M8 15L15 8L8 1M15 8L1 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
											</svg>
										</Link>
									</div>
									<div className="col-lg-6 offset-lg-1 position-relative z-1 mt-lg-0 mt-4">
										<div className="d-flex flex-column gap-4">
											<div className="d-flex gap-4">
												<div className="position-relative">
													<img className="bdrd8 w-100" src="/assets/imgs/cta/cta-8/img-1.png" alt="Tokoss Motors" />
												</div>
												<div className="mt-auto">
													<img className="bdrd8 w-100" src="/assets/imgs/cta/cta-8/img-2.png" alt="Tokoss Motors" />
												</div>
											</div>
											<div className="d-flex gap-4">
												<div className="position-relative">
													<img className="bdrd8 w-100" src="/assets/imgs/cta/cta-8/img-3.png" alt="Tokoss Motors" />
												</div>
												<div className="position-relative">
													<img className="bdrd8 w-100" src="/assets/imgs/cta/cta-8/img-4.png" alt="Tokoss Motors" />
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="bg-overlay position-absolute bottom-0 end-0 h-75 background-brand-2 opacity-25 z-0 rounded-start-pill" />
						</div>
					</section>
					
					
					{/* faqs 1 */}
					<section className="section-box box-faqs background-body pt-0">
						<div className="box-faqs-inner">
							<div className="container">
								<div className="text-center">
									<span className="text-sm-bold bg-2 p-3 rounded-12">Our Support</span>
									<h3 className="mt-4 neutral-1000">Frequently Asked Questions</h3>
								</div>
								<div className="block-faqs">
									<div className="accordion" id="accordionFAQ">
										<div className="accordion-item wow fadeInUp border-bottom-0">
											<h5 className="accordion-header" id="headingOne" onClick={() => handleAccordion(1)}>
												<button className={`accordion-button text-heading-5 ${isAccordion === 1 ? 'collapsed' : ''}`} type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
													<h3>01</h3>
													<p>How do I make a reservation on your website</p>
												</button>
											</h5>
											<div className={`accordion-collapse collapse ${isAccordion == 1 ? 'show' : ''} `} id="collapseOne" aria-labelledby="headingOne" data-bs-parent="#accordionFAQ">
												<div className="accordion-body">Provide a step-by-step guide on how users can browse and book travel services on your platform. Include information on searching for destinations, selecting dates, choosing accommodation, and completing the booking process. Mention any special features or tools that can help users find the best deals.</div>
											</div>
										</div>
										<div className="accordion-item wow fadeInUp border-bottom-0">
											<h5 className="accordion-header" id="headingTwo" onClick={() => handleAccordion(2)}>
												<button className={`accordion-button text-heading-5 ${isAccordion === 2 ? 'collapsed' : ''}`} type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
													<h3>02</h3>
													<p>What documents do I need for my trip, and how do I obtain them?</p>
												</button>
											</h5>
											<div className={`accordion-collapse collapse ${isAccordion == 2 ? 'show' : ''} `} id="collapseTwo" aria-labelledby="headingTwo" data-bs-parent="#accordionFAQ">
												<div className="accordion-body">Provide a step-by-step guide on how users can browse and book travel services on your platform. Include information on searching for destinations, selecting dates, choosing accommodation, and completing the booking process. Mention any special features or tools that can help users find the best deals.</div>
											</div>
										</div>
										<div className="accordion-item wow fadeInUp border-bottom-0">
											<h5 className="accordion-header" id="headingThree" onClick={() => handleAccordion(3)}>
												<button className={`accordion-button text-heading-5 ${isAccordion === 3 ? 'collapsed' : ''}`} type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
													<h3>03</h3>
													<p>In the event that I need to modify or cancel my reservation, what are the policies in place?</p>
												</button>
											</h5>
											<div className={`accordion-collapse collapse ${isAccordion == 3 ? 'show' : ''} `} id="collapseThree" aria-labelledby="headingThree" data-bs-parent="#accordionFAQ">
												<div className="accordion-body">Provide a step-by-step guide on how users can browse and book travel services on your platform. Include information on searching for destinations, selecting dates, choosing accommodation, and completing the booking process. Mention any special features or tools that can help users find the best deals.</div>
											</div>
										</div>
										<div className="accordion-item wow fadeInUp border-bottom-0">
											<h5 className="accordion-header" id="headingFour" onClick={() => handleAccordion(4)}>
												<button className={`accordion-button text-heading-5 ${isAccordion === 4 ? 'collapsed' : ''}`} type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
													<h3>04</h3>
													<p>Can you specify the types of credit/debit cards, digital wallets, or other online payment methods accepted?</p>
												</button>
											</h5>
											<div className={`accordion-collapse collapse ${isAccordion == 4 ? 'show' : ''} `} id="collapseFour" aria-labelledby="headingFour" data-bs-parent="#accordionFAQ">
												<div className="accordion-body">Provide a step-by-step guide on how users can browse and book travel services on your platform. Include information on searching for destinations, selecting dates, choosing accommodation, and completing the booking process. Mention any special features or tools that can help users find the best deals.</div>
											</div>
										</div>
										<div className="accordion-item wow fadeInUp border-bottom-0">
											<h5 className="accordion-header" id="headingFive" onClick={() => handleAccordion(5)}>
												<button className={`accordion-button text-heading-5 ${isAccordion === 5 ? 'collapsed' : ''}`} type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
													<h3>05</h3>
													<p>What are the working hours, and what can I expect in terms of response times?</p>
												</button>
											</h5>
											<div className={`accordion-collapse collapse ${isAccordion == 5 ? 'show' : ''} `} id="collapseFive" aria-labelledby="headingFive" data-bs-parent="#accordionFAQ">
												<div className="accordion-body">Provide a step-by-step guide on how users can browse and book travel services on your platform. Include information on searching for destinations, selecting dates, choosing accommodation, and completing the booking process. Mention any special features or tools that can help users find the best deals.</div>
											</div>
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col-12 wow fadeInUp mt-4">
										<div className="d-flex justify-content-center gap-2">
											<Link className="btn btn-primary mt-2" href="#">
												Contact Us
												<svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M8 15L15 8L8 1M15 8L1 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
												</svg>
											</Link>
											<Link className="btn btn-primary bg-transparent mt-2 invert" href="#">
												Help Center
												<svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M8 15L15 8L8 1M15 8L1 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
												</svg>
											</Link>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>
					
					<ModalVideo channel='youtube' isOpen={isOpen} videoId="JXMWOmuR1hU" onClose={() => setOpen(false)} />
				</div>
			</Layout>
		</>
	)
}