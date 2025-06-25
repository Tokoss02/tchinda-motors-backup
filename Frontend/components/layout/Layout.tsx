
'use client'
import { useEffect, useState } from "react"
import BackToTop from '../elements/BackToTop'
import Breadcrumb from './Breadcrumb'
import MobileMenu from './MobileMenu'
import Offcanvas from './Offcanvas'
import Footer from './footer/Footer'
import Header from './header/Header'




interface LayoutProps {
	headerStyle?: Number
	footerStyle?: Number
	children?: React.ReactNode
	breadcrumbTitle?: string
}


export default function Layout({ headerStyle, footerStyle, breadcrumbTitle, children }: LayoutProps) {
	const [scroll, setScroll] = useState<boolean>(false)
	// MobileMenu
	const [isMobileMenu, setMobileMenu] = useState<boolean>(false)
	const handleMobileMenu = (): void => {
		setMobileMenu(!isMobileMenu)
		!isMobileMenu ? document.body.classList.add("mobile-menu-active") : document.body.classList.remove("mobile-menu-active")
	}
	// Offcanvas
	const [isOffcanvas, setOffcanvas] = useState<boolean>(false)
	const handleOffcanvas = (): void => {
		setOffcanvas(!isOffcanvas)
		!isOffcanvas ? document.body.classList.add("canvas-menu-active") : document.body.classList.remove("canvas-menu-active")
	}


	useEffect(() => {
		const WOW: any = require('wowjs');
		(window as any).wow = new WOW.WOW({
			live: false
		});

		// Initialize WOW.js
		(window as any).wow.init()

		const handleScroll = (): void => {
			const scrollCheck: boolean = window.scrollY > 100
			if (scrollCheck !== scroll) {
				setScroll(scrollCheck)
			}
		}

		document.addEventListener("scroll", handleScroll)

		return () => {
			document.removeEventListener("scroll", handleScroll)
		}
	}, [scroll])
	return (
		<>
			<div id="top" />
			{!headerStyle && <Header scroll={scroll} isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} isOffcanvas={isOffcanvas} handleOffcanvas={handleOffcanvas} />}
			{headerStyle == 2 ? <Header scroll={scroll} isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} isOffcanvas={isOffcanvas} handleOffcanvas={handleOffcanvas} /> : null}
			<MobileMenu isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} />
			<Offcanvas isOffcanvas={isOffcanvas} handleOffcanvas={handleOffcanvas} />

			<main className="main">
				{breadcrumbTitle && <Breadcrumb breadcrumbTitle={breadcrumbTitle} />}

				{children}
			</main>

			{!footerStyle && < Footer />}
			{footerStyle == 1 ? < Footer /> : null}

			{/* WhatsApp Floating Button */}
			<a
				href="https://wa.me/971523117757" // Replace with your WhatsApp number
				className="whatsapp-float"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="Chat on WhatsApp"
				>
				<img
					src="/assets/whatsapp.svg" // Replace with your WhatsApp icon path
					alt="WhatsApp"
					style={{
					width: "50px",
					height: "50px",
					position: "fixed",
					bottom: "90px",
					right: "20px",
					zIndex: 9999,
					cursor: "pointer",
					}}
				/>
			</a>
		</>
	)
}
