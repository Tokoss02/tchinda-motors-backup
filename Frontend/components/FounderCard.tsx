'use client'

import Link from "next/link"

export default function FounderCard() {
    return (
        <section className="section-team-1 py-96 background-body border-top border-bottom">
            <div className="container">

                {/* HEADER */}
                <div className="row align-items-center justify-content-center">
                    <div className="col-xl-6 col-lg-7 col-md-9 col-sm-11">
                        <div className="text-center mb-5">
                            <h3 className="section-title neutral-1000">Leadership</h3>
                            {/*<span className="text-xl-medium neutral-500">Tchinda Motors Leader</span>*/}

                        </div>
                    </div>
                </div>

                {/* CARD */}
                <div className="row mt-50 justify-content-center">
                    <div className="col-lg-6 col-md-8 col-sm-12">
                        <div className="card-news background-card hover-up shadow-2 p-4 p-lg-5">

                            {/* FLEX CONTAINER */}
                            <div className="d-flex flex-column flex-lg-row align-items-center gap-4">

                                {/* IMAGE */}
                                <div className="card-image flex-shrink-0">
                                    <img
                                        src="/assets/imgs/team/team-1/portrait-1.png"
                                        alt="Tchinda Motors"
                                        className="rounded-3"
                                        style={{ maxWidth: "220px" }}
                                    />
                                </div>

                                {/* CONTENT */}
                                <div className="card-info">

                                    {/* TEXT / QUOTE */}
                                    <p className="text-md-medium neutral-600 mb-4" style={{ lineHeight: "1.7" }}>
                                        Tchinda Motors was created to make buying and exporting vehicles accros UAE simple, transparent, and trustworthy.
                                        We focus on delivering quality cars, clear information, and reliable service to clients around the world.
                                        Our mission is to build long-term relationships by putting our customers first and maintaining the highest standards in everything we do.
                                    </p>

                                    {/* NAME */}
                                    <div className="card-title mb-3">
                                        <Link className="text-xl-bold neutral-1000" href="/dealer-details">
                                            <h6 className="mb-1">Yan Zu</h6>
                                        </Link>
                                        <span className="text-sm-medium neutral-500">CEO - Founder</span>
                                    </div>

                                    {/* SOCIALS 
                                    <div className="card-program">
                                        <div className="endtime d-flex justify-content-between align-items-center">
                                            
                                            <div className="card-author d-flex align-items-center gap-2">
                                                <Link href="#" className="rounded-circle background-100 icon-shape icon icon-sm hover-up">
                                                    <img src="/assets/imgs/team/team-1/icon-1.svg" alt="" />
                                                </Link>
                                                <Link href="#" className="rounded-circle background-100 icon-shape icon icon-sm hover-up">
                                                    <img src="/assets/imgs/team/team-1/icon-2.svg" alt="" />
                                                </Link>
                                                <Link href="#" className="rounded-circle background-100 icon-shape icon icon-sm hover-up">
                                                    <img src="/assets/imgs/team/team-1/icon-3.svg" alt="" />
                                                </Link>
                                                <Link href="#" className="rounded-circle background-100 icon-shape icon icon-sm hover-up">
                                                    <img src="/assets/imgs/team/team-1/icon-4.svg" alt="" />
                                                </Link>
                                            </div>

                                            <Link href="/dealer-details" className="rounded-circle background-100 icon-shape icon icon-sm hover-up border">
                                                <img src="/assets/imgs/team/team-1/arrow-up-right.svg" alt="" />
                                            </Link>

                                        </div>
                                    </div>*/}

                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}