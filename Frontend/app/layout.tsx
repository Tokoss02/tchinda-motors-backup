import type { Metadata } from "next"
import { Urbanist } from "next/font/google"
import BackToTop from "@/components/elements/BackToTop";
import "@/node_modules/react-modal-video/css/modal-video.css"
import "/public/assets/css/main.css"
import { Toaster } from 'react-hot-toast';
import 'bootstrap-icons/font/bootstrap-icons.css';
import ComingSoon from "./coming-soon";
import Script from 'next/script';

const urbanist = Urbanist({
	weight: ['300', '400', '500', '600', '700', '800', '900'],
	subsets: ['latin'],
	variable: "--urbanist",
	display: 'swap',
})

const isMaintenance = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true';

export const metadata: Metadata = {
	title: "Tokoss Motors | Global Car Exports from Dubai to Africa & Beyond",
	description: "Explore Tokoss Motors, your trusted car dealership in Dubai, specializing in exporting high-quality vehicles to Africa and worldwide. Find used cars, new cars luxury vehicles, and more with reliable shipping services.",
	openGraph: {
		title: "Tokoss Motors | Global Car Exports",
		description: "Trusted Dubai dealership for exporting cars to Africa. Browse our listings of new and used cars, SUVs, luxury vehicles, and more.",
		url: "https://tokossmotors.com",
		siteName: "Tokoss Motors",
		images: [
			{
				url: "https://tokossmotors.com/assets/imgs/template/cover-tokoss-motors.jpg",
				width: 1200,
				height: 630,
				alt: "Tokoss Motors - Dubai Car Export",
			},
		],
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Tokoss Motors | Global Car Exports",
		description:
			"Explore used and new cars exported from Dubai to Africa with Tokoss Motors. Fast shipping and trusted service.",
		images: ["https://tokossmotors.com/assets/imgs/template/tokoss-motors-logo-06.png"],
	},
	icons: {
		icon: "/favicon.ico",
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<head>
				<meta name="description" content="Tokoss Motors – Global Car Exports" />
				<meta name="keywords" content="cars, dealership, car dealership Dubai, car export Dubai, vehicles for export, car shipping Dubai, Dubai used cars, Dubai New cars, Toyota cars for export, Lexus Dubai, RORO car shipping, export cars Africa, Dubai car exports to Nigeria, Dubai car exports to Algeria, Dubai car exports to Cameroon, car export to Ghana, used cars for sale Dubai, New cars for sale Dubai"
				/>
				<link rel="canonical" href="https://tokossmotors.com" />
				<link rel="me" href="https://www.facebook.com/TokossMotorsFze" />
				<link rel="me" href="https://www.youtube.com/@TokossMotors" />
				<link rel="me" href="https://www.tiktok.com/@tokossmotors" />
				<link rel="me" href="https://www.instagram.com/tokossmotors" />
				<link rel="me" href="https://x.com/tokossmotors" />


				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							"@context": "https://schema.org",
							"@type": "Organization",
							"name": "Tokoss Motors",
							"url": "https://tokossmotors.com",
							"logo": "https://tokossmotors.com/assets/imgs/template/Tokoss-motors-Logo-01.png", // Replace with actual logo path if needed
							"sameAs": [
								"https://www.facebook.com/TokossMotorsFze",
								"https://www.youtube.com/@TokossMotors",
								"https://www.tiktok.com/@tokossmotors",
								"https://www.instagram.com/tokossmotors",
								"https://x.com/tokossmotors"
							]
						}),
					}}
				/>
				{/* Google Analytics Tracking */}
				<Script
					strategy="afterInteractive"
					src="https://www.googletagmanager.com/gtag/js?id=G-EC6VB11EY5"
				/>
				<Script
					id="google-analytics"
					strategy="afterInteractive"
					dangerouslySetInnerHTML={{
						__html: `
							window.dataLayer = window.dataLayer || [];
							function gtag(){dataLayer.push(arguments);}
							gtag('js', new Date());
							gtag('config', 'G-EC6VB11EY5', {
								page_path: window.location.pathname,
							});
						`,
					}}
				/>
			</head>
			<body className={urbanist.variable}>
				{isMaintenance ? (
					<ComingSoon /> // 👈 Only show this page if maintenance mode is on
				) : (
					<>
						{children} {/* Page Content */}
						<BackToTop /> {/* Optional BackToTop button */}
						<Toaster position="top-right" reverseOrder={false} />
					</>
				)}
			</body>
		</html>
	)
}


