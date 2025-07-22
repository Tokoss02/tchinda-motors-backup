'use client'
import Link from 'next/link'
import Dropdown from 'react-bootstrap/Dropdown'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
export default function Header({ scroll, handleMobileMenu }: any) {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
	return (
		<>
			<header className={`header sticky-bar header-home-2 ${scroll ? 'stick' : ''}`}>
				<div className="top-bar top-bar-2 top-bar-3 @@bg">
					<div className="container-fluid">
						<div className="text-header-info">
							<Link className="phone-head text-white" href="tel:+971523117757">
								<svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M13.656 2.34229C10.5314 -0.781426 5.46601 -0.780676 2.34229 2.34401C-0.781426 5.4687 -0.780676 10.534 2.34401 13.6577C5.4687 16.7814 10.534 16.7807 13.6577 13.656C15.1579 12.1554 16.0005 10.1202 16 7.99829C15.9996 5.87673 15.1564 3.84223 13.656 2.34229ZM12.1157 11.1439C12.1154 11.1443 12.115 11.1446 12.1147 11.145V11.1423L11.7093 11.545C11.1851 12.0758 10.4216 12.2942 9.69598 12.121C8.96489 11.9253 8.26989 11.6138 7.63732 11.1983C7.04964 10.8227 6.50501 10.3837 6.01332 9.88898C5.56092 9.43989 5.15448 8.94676 4.79998 8.41698C4.41223 7.84692 4.10532 7.22592 3.88798 6.57164C3.63882 5.80301 3.84529 4.95961 4.42132 4.39298L4.89598 3.91832C5.02795 3.78576 5.24239 3.78529 5.37492 3.91726C5.37526 3.91761 5.37564 3.91795 5.37598 3.91832L6.87464 5.41698C7.0072 5.54895 7.00767 5.76339 6.8757 5.89592C6.87536 5.89626 6.87501 5.89661 6.87464 5.89698L5.99464 6.77698C5.74214 7.02673 5.71039 7.42361 5.91998 7.71032C6.23826 8.14714 6.59048 8.55817 6.97332 8.93967C7.40017 9.36835 7.8642 9.75832 8.35998 10.105C8.64645 10.3048 9.03482 10.2711 9.28264 10.025L10.1333 9.16101C10.2653 9.02845 10.4797 9.02798 10.6122 9.15995C10.6126 9.16029 10.6129 9.16064 10.6133 9.16101L12.1146 10.665C12.2472 10.7969 12.2477 11.0114 12.1157 11.1439Z" fill="white" />
								</svg>
								<span className="d-none d-lg-inline-block">+971 52 311 7757</span>
							</Link>
							<Link className="email-head text-white" href="mailto:contact@tokossmotors.com">
								<svg width={16} height={12} viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path fillRule="evenodd" clipRule="evenodd" d="M1.96372 1.07378L6.28622 5.39816C7.22897 6.33909 8.77003 6.33991 9.71356 5.39816L14.0361 1.07378C14.0796 1.03025 14.0732 0.958563 14.0227 0.923344C13.5819 0.615875 13.0455 0.433594 12.4677 0.433594H3.53216C2.95431 0.433594 2.41791 0.615906 1.97703 0.923344C1.92653 0.958563 1.92019 1.03025 1.96372 1.07378ZM0.808594 3.15713C0.808594 2.70275 0.92125 2.27344 1.11969 1.89609C1.15072 1.83706 1.22938 1.82513 1.27653 1.87228L5.54431 6.14006C6.89578 7.4935 9.10322 7.49428 10.4555 6.14006L14.7233 1.87228C14.7704 1.82513 14.8491 1.83706 14.8801 1.89609C15.0785 2.27344 15.1912 2.70278 15.1912 3.15713V8.84266C15.1912 10.3456 13.9687 11.5662 12.4677 11.5662H3.53216C2.03116 11.5662 0.808594 10.3456 0.808594 8.84266V3.15713Z" fill="white" />
								</svg>
								<span className="d-none d-lg-inline-block">contact@tokossmotors.com</span>
							</Link>
						</div>
						<div>
							<div className="text-unlock text-sm-medium text-white">  From <span className="text-primary">Dubai </span>
								to the World – We <span className="text-primary"> Export!</span>
							</div>

						</div>


						<div className="d-flex align-items-center justify-content-center justify-content-md-end">
							<p className="text-lg-bold neutral-0 d-inline-block mr-10">Follow us</p>
							<div className="box-socials-footer d-inline-block">

								<Link className="icon-socials icon-facebook"
									href="https://www.facebook.com/tokossmotorsfze/"
									aria-label="Visit Tokoss Motors on Facebook"
									target="_blank"
									rel="noopener noreferrer"
								>
									<svg xmlns="http://www.w3.org/2000/svg" width={21} height={20} viewBox="0 0 21 20" fill="none">
										<path d="M18.7563 13.4915C18.7563 16.5248 16.9479 18.3332 13.9146 18.3332H12.9229C12.4646 18.3332 12.0896 17.9582 12.0896 17.4998V12.6915C12.0896 12.4665 12.2729 12.2748 12.4979 12.2748L13.9646 12.2498C14.0813 12.2415 14.1813 12.1582 14.2063 12.0415L14.4979 10.4498C14.5229 10.2998 14.4063 10.1582 14.2479 10.1582L12.4729 10.1832C12.2396 10.1832 12.0563 9.99985 12.0479 9.77485L12.0146 7.73317C12.0146 7.59984 12.1229 7.48318 12.2646 7.48318L14.2646 7.44984C14.4063 7.44984 14.5146 7.34152 14.5146 7.19985L14.4813 5.19983C14.4813 5.05816 14.3729 4.94984 14.2313 4.94984L11.9813 4.98318C10.5979 5.00818 9.49794 6.1415 9.52294 7.52484L9.5646 9.8165C9.57293 10.0498 9.38961 10.2332 9.15628 10.2415L8.15627 10.2582C8.0146 10.2582 7.90628 10.3665 7.90628 10.5082L7.93127 12.0915C7.93127 12.2332 8.0396 12.3415 8.18126 12.3415L9.18127 12.3248C9.41461 12.3248 9.59792 12.5082 9.60626 12.7332L9.68125 17.4832C9.68959 17.9498 9.31459 18.3332 8.84792 18.3332H6.93126C3.89793 18.3332 2.0896 16.5248 2.0896 13.4832V6.50817C2.0896 3.47484 3.89793 1.6665 6.93126 1.6665H13.9146C16.9479 1.6665 18.7563 3.47484 18.7563 6.50817V13.4915Z" fill="white" />
									</svg>
								</Link>
								<Link className="icon-socials icon-instagram"
									href="https://www.instagram.com/tokossmotors/"
									aria-label="Visit Tokoss Motors on Instagram"
									target="_blank"
									rel="noopener noreferrer"
								>
									<svg xmlns="http://www.w3.org/2000/svg" width={21} height={20} viewBox="0 0 21 20" fill="none">
										<path d="M13.9146 1.6665H6.93127C3.89793 1.6665 2.0896 3.47484 2.0896 6.50817V13.4832C2.0896 16.5248 3.89793 18.3332 6.93127 18.3332H13.9063C16.9396 18.3332 18.7479 16.5248 18.7479 13.4915V6.50817C18.7563 3.47484 16.9479 1.6665 13.9146 1.6665ZM10.4229 13.2332C8.6396 13.2332 7.1896 11.7832 7.1896 9.99984C7.1896 8.2165 8.6396 6.7665 10.4229 6.7665C12.2063 6.7665 13.6563 8.2165 13.6563 9.99984C13.6563 11.7832 12.2063 13.2332 10.4229 13.2332ZM15.3563 5.73317C15.3146 5.83317 15.2563 5.92484 15.1813 6.00817C15.0979 6.08317 15.0063 6.1415 14.9063 6.18317C14.8063 6.22484 14.6979 6.24984 14.5896 6.24984C14.3646 6.24984 14.1563 6.1665 13.9979 6.00817C13.9229 5.92484 13.8646 5.83317 13.8229 5.73317C13.7813 5.63317 13.7563 5.52484 13.7563 5.4165C13.7563 5.30817 13.7813 5.19984 13.8229 5.09984C13.8646 4.9915 13.9229 4.90817 13.9979 4.82484C14.1896 4.63317 14.4813 4.5415 14.7479 4.59984C14.8063 4.60817 14.8563 4.62484 14.9063 4.64984C14.9563 4.6665 15.0063 4.6915 15.0563 4.72484C15.0979 4.74984 15.1396 4.7915 15.1813 4.82484C15.2563 4.90817 15.3146 4.9915 15.3563 5.09984C15.3979 5.19984 15.4229 5.30817 15.4229 5.4165C15.4229 5.52484 15.3979 5.63317 15.3563 5.73317Z" fill="white" />
									</svg>
								</Link>
								<Link className="icon-socials icon-tiktok"
									href="https://www.tiktok.com/@tokossmotors/"
									aria-label="Visit Tokoss Motors on TikTok"
									target="_blank"
									rel="noopener noreferrer"
								>
									<svg xmlns="http://www.w3.org/2000/svg" width={21} height={20} viewBox="0 0 448 512" fill="none">
										<path d="M448 209.9a210.1 210.1 0 0 1 -122.8-39.3V349.4A162.6 162.6 0 1 1 185 188.3V278.2a74.6 74.6 0 1 0 52.2 71.2V0l88 0a121.2 121.2 0 0 0 1.9 22.2h0A122.2 122.2 0 0 0 381 102.4a121.4 121.4 0 0 0 67 20.1z" fill="white" />
									</svg>
								</Link>
								<Link className="icon-socials icon-be"
									href="https://www.youtube.com/@tokossmotors/"
									aria-label="Visit Tokoss Motors on YouTube"
									target="_blank"
									rel="noopener noreferrer"
								>
									<svg width={21} height={15} viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M8.82393 10.736L13.9225 7.78881L8.82393 4.84165V10.736ZM20.1803 3.04389C20.308 3.50561 20.3964 4.12451 20.4554 4.91042C20.5242 5.69633 20.5536 6.37418 20.5536 6.96361L20.6126 7.78881C20.6126 9.94024 20.4554 11.5219 20.1803 12.5337C19.9347 13.4179 19.3649 13.9877 18.4808 14.2333C18.0191 14.361 17.1742 14.4494 15.8775 14.5083C14.6004 14.5771 13.4313 14.6066 12.3507 14.6066L10.7887 14.6655C6.67251 14.6655 4.10848 14.5083 3.09662 14.2333C2.21247 13.9877 1.64269 13.4179 1.39709 12.5337C1.26938 12.072 1.18097 11.4531 1.12203 10.6672C1.05326 9.8813 1.02379 9.20345 1.02379 8.61402L0.964844 7.78881C0.964844 5.63739 1.12203 4.05575 1.39709 3.04389C1.64269 2.15974 2.21247 1.58996 3.09662 1.34436C3.55834 1.21665 4.4032 1.12823 5.69995 1.06929C6.97705 1.00052 8.14609 0.971052 9.22671 0.971052L10.7887 0.912109C14.9049 0.912109 17.4689 1.06929 18.4808 1.34436C19.3649 1.58996 19.9347 2.15974 20.1803 3.04389Z" fill="true" />
									</svg>
								</Link>
								<Link className="icon-socials icon-twitter"
									href="https://www.twitter.com/tokossmotors/"
									aria-label="Visit Tokoss Motors on Twitter"
									target="_blank"
									rel="noopener noreferrer"
								>
									<svg xmlns="http://www.w3.org/2000/svg" width={21} height={20} viewBox="0 0 21 20" fill="none">
										<path d="M12.2847 8.46864L19.5701 0H17.8437L11.5178 7.3532L6.46535 0H0.637939L8.27824 11.1193L0.637939 20H2.36443L9.04472 12.2348L14.3805 20H20.2079L12.2843 8.46864H12.2847ZM9.92005 11.2173L9.14593 10.1101L2.98651 1.29967H5.63831L10.609 8.40994L11.3831 9.51718L17.8445 18.7594H15.1927L9.92005 11.2177V11.2173Z" fill="white" />
									</svg>
								</Link>
							</div>
						</div>



						<div className="top-right-header">
							{/*<Dropdown className="d-none d-xl-inline-block box-dropdown-cart align-middle mr-15 head-lang">
								<Dropdown.Toggle as="span" className="text-14-medium icon-list icon-account icon-lang">
									<span className="text-14-medium arrow-down">EN</span>
								</Dropdown.Toggle>
								<Dropdown.Menu className="dropdown-account" style={{ visibility: 'visible' }}>
									<ul>
										<li><Link className="text-sm-medium" href="#">English</Link></li>
										<li><Link className="text-sm-medium" href="#">French</Link></li>
										<li><Link className="text-sm-medium" href="#">Arabic</Link></li>
									</ul>
								</Dropdown.Menu>
							</Dropdown>
							<Dropdown className="d-none d-xl-inline-block box-dropdown-cart align-middle head-currency">
								<Dropdown.Toggle  as="span" className="text-14-medium icon-list icon-cart">
									<span className="text-14-medium arrow-down">AED</span>
									</Dropdown.Toggle>
								<Dropdown.Menu style={{visibility: 'visible'}} className="dropdown-cart">
									<ul>
										<li><Link className="text-sm-medium" href="#">USD</Link></li>
										<li><Link className="text-sm-medium" href="#">EUR</Link></li>
										<li><Link className="text-sm-medium" href="#">AED</Link></li>
									</ul>
								</Dropdown.Menu>
							</Dropdown>
							<div className="top-button-mode">
								<ThemeSwitch />
							</div>*/}
						</div>
					</div>
				</div>
				<div className="container-fluid background-body">
					<div className="main-header">
						<div className="header-left">
							<div className="header-logo">
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
							</div>
							<div className="header-nav">
								<nav className="nav-main-menu">
									<ul className="main-menu">
										<li ><Link href="/">Home</Link></li>
										<li ><Link href="/inventory">Vehicles</Link></li>
										<li ><Link href="/term">Term & policy</Link></li>

										{/* 
										<li>
											<Link href="/blog">News</Link>
										</li>
										<li >
											<Link href="/about-us">About Us</Link>
										</li>
										<li className="has-children">
											<Link href="#">Terms</Link>
											<ul className="sub-menu">
												<li><Link href="/services">Our Services</Link></li>
												<li><Link href="/faqs">FAQs</Link></li>
												<li><Link href="/term">Term and policy</Link></li>
											</ul>
										</li>*/}

										<li><Link href="/contact">Contact Us</Link></li>
									</ul>
								</nav>
							</div>
							<div className="header-right">
								<div className="burger-icon burger-icon-white" onClick={handleMobileMenu}>
									<span className="burger-icon-top" />
									<span className="burger-icon-mid"> </span>
									<span className="burger-icon-bottom"> </span>
								</div>
							</div>
						</div>
					</div>
				</div>

			</header>

		</>
	)
}
