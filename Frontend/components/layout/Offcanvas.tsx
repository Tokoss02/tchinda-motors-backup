import Link from 'next/link'

export default function Offcanvas({ isOffcanvas, handleOffcanvas }: any) {
	return (
		<>
			<div className={`sidebar-canvas-wrapper perfect-scrollbar button-bg-2 ${isOffcanvas ? "sidebar-canvas-visible" : ""}`}>
				<div className="sidebar-canvas-container">
					<div className="sidebar-canvas-head">
						<div className="sidebar-canvas-logo">
							<Link className="d-flex" href="/">
							<img
								src="/assets/imgs/template/Tchinda-motors-Logo-d.svg"
								className="light-mode"
								alt="Tchinda Motors"
								loading="eager"
								fetchPriority="high"
								width={180}
								height={75} />
							<img
								src="/assets/imgs/template/Tchinda-motors-Logo-w.svg"
								className="dark-mode"
								alt="Tchinda Motors"
								width={120}
								height={60}
								loading="eager"
								fetchPriority='high'
							/>
						</Link>
						</div>
						<div className="sidebar-canvas-lang">
							<a className="close-canvas" href="https://www.tchindamotors.com" onClick={handleOffcanvas}> <img alt="Tchinda Motors" src="/assets/imgs/template/icons/close.png" /></a>
						</div>
					</div>
					<div className="sidebar-canvas-content">
						<nav className="nav nav-pills flex-column gap-2">
							<Link href="/" className="nav-link">Home</Link>
							<Link href="/inventory" className="nav-link">Vehicles</Link>
							<Link href="/term" className="nav-link">Term & Policy</Link>
							<Link href="/contact" className="nav-link">Contact Us</Link>
						</nav>
					
					</div>

				</div>
			</div>
			{isOffcanvas && (
				<div className="body-overlay-1" onClick={handleOffcanvas} />
			)}

		</>
	)
}
