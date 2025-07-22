'use client'
import Link from 'next/link'
import { useState } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'

export default function MobileMenu({ isMobileMenu, handleMobileMenu }: any) {
	const [isAccordion, setIsAccordion] = useState<number | null>(null)

	const handleAccordion = (key: number) => {
		setIsAccordion(prev => (prev === key ? null : key))
	}

	return (
		<>
			<div className={`mobile-header-active mobile-header-wrapper-style perfect-scrollbar button-bg-2 ${isMobileMenu ? 'sidebar-visible' : ''}`}>
				<PerfectScrollbar className="mobile-header-wrapper-inner">
					<div className="mobile-header-logo">
						<Link className="d-flex" href="/">
							<img
								src="/assets/imgs/template/Tokoss-motors-Logo-d.svg"
								className="light-mode"
								alt="Tokoss Motors"
								loading="eager"
								fetchPriority="high"
								width={180}
								height={75} />
							<img
								src="/assets/imgs/template/Tokoss-motors-Logo-w.svg"
								className="dark-mode"
								alt="Tokoss Motors"
								width={120}
								height={60}
								loading="eager"
								fetchPriority='high'
							/>
						</Link>
						<div className="burger-icon burger-icon-white" onClick={handleMobileMenu} />
					</div>
					<div className="mobile-header-content-area">
						<div className="perfect-scroll">
							<div className="mobile-menu-wrap mobile-header-border">
								<nav>
									<ul className="mobile-menu font-heading">
										<li>
											<Link href="/">Home</Link>
										</li>
										<li>
											<Link href="/inventory">Vehicles</Link>
										</li>
										<li>
											<Link href="/term">Term & Policy</Link>
										</li>
										<li>
											<Link href="/contact">Contact Us</Link>
										</li>

										<li className={`has-children ${isAccordion === 1 ? 'active' : ''}`}>
											<span className="menu-expand" onClick={() => handleAccordion(1)}>
												<i className="arrow-small-down"></i>
											</span>
											<Link href="#">Language</Link>
											<ul className="sub-menu" style={{ display: isAccordion === 1 ? 'block' : 'none' }}>
												<li><Link href="#">English</Link></li>
												<li><Link href="#">French</Link></li>
												<li><Link href="#">Arabic</Link></li>
											</ul>
										</li>
									</ul>
								</nav>
							</div>
						</div>
					</div>
				</PerfectScrollbar>
			</div>
			{isMobileMenu && <div className="body-overlay-1" onClick={handleMobileMenu} />}
		</>
	)
}
