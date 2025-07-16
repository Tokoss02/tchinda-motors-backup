'use client'


export default function Hero1() {
	return (
		 <div className="video-banner">

		<section >
			<video
				className="absolute inset-0 w-full h-full object-contain z-0"
				autoPlay
				loop
				muted
				playsInline
				id="myVideo"
				width="100%"
				aria-hidden="true"
				data-origwidth="100" data-origheight="0" style={{ width: '100%', height: '0px' }}
			>
				<source src="/videos/tokossmotors.mp4" type="video/mp4" />
			</video>

			{/* 🔲 Overlay for styling (optional) */}
			<div className="absolute inset-0 bg-black bg-opacity-50 z-10" />

		</section>
		</div>
	);
}
