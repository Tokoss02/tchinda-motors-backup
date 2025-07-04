'use client'


export default function Hero1() {
	return (
		<section className="relative w-full h-screen bg-black overflow-hidden">
			<video
				className="absolute inset-0 w-full h-full object-contain z-0"
				autoPlay
				loop
				muted
				playsInline
				aria-hidden="true"
			>
				<source src="/hero.mp4" type="video/mp4" />
			</video>

			{/* 🔲 Overlay for styling (optional) */}
			<div className="absolute inset-0 bg-black bg-opacity-50 z-10" />

		</section>
	);
}


