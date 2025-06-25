import type { Metadata } from "next"
import { Urbanist } from "next/font/google"
import BackToTop from "@/components/elements/BackToTop";
import "@/node_modules/react-modal-video/css/modal-video.css"
import "/public/assets/css/main.css"
import { Toaster } from 'react-hot-toast';
import 'bootstrap-icons/font/bootstrap-icons.css';


const urbanist = Urbanist({
	weight: ['300', '400', '500', '600', '700', '800', '900'],
	subsets: ['latin'],
	variable: "--urbanist",
	display: 'swap',
})

export const metadata: Metadata = {
	title: "Tokoss Motors | Global Car Exports from Dubai to Africa & Beyond",
	description: "Explore Tokoss Motors, your trusted car dealership in Dubai, specializing in exporting high-quality vehicles to Africa and worldwide. Find used cars, new cars luxury vehicles, and more with reliable shipping services.",
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
       			 <meta name="keywords" content="cars, dealership, car dealership Dubai, car export Dubai, vehicles for export, car shipping Dubai, Dubai used cars, Dubai New cars, Toyota cars for export, Lexus Dubai, RORO car shipping, export cars Africa, Dubai car exports to Nigeria, Dubai car exports to Algeria, Dubai car exports to Cameroon, car export to Ghana, used cars for sale Dubai, New cars for sale Dubai" />
       			 {/* Add any other meta tags or links here */}
      		</head>
      <body className={urbanist.variable}>
        {children} {/* Page Content */}
        <BackToTop /> {/* Optional BackToTop button */}
		<Toaster position="top-right" reverseOrder={false} />
      </body>
    </html>
	)
}


