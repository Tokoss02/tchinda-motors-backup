//frontend/app/page.tsx
import Blog1 from "@/components/sections/Blog1"
import Brand2 from "@/components/sections/Brand2"
import Banners2 from "@/components/sections/Banners2"
import CarsListing1 from "@/components/elements/CarsListing1"
import Categories2 from "@/components/sections/Categories"
import Hero1 from "@/components/sections/Hero1"
import Search1 from "@/components/sections/Search1"
import WhyUs1 from "@/components/sections/WhyUs1"
import Layout from "@/components/layout/Layout"
import BrandMarquee from "@/components/BrandMarquee"

export default async function Home() {

	return (

		<main>
			<Layout footerStyle={1}>
				<Hero1 />
				<Search1 />
				<Brand2 />
				<Categories2 />
				<CarsListing1 />
				<WhyUs1 />
				<Banners2 />
				<BrandMarquee />
				{/*<Blog1 />*/}
			</Layout>
	  </main>
	)
}