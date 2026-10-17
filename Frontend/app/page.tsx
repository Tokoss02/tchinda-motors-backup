// frontend/app/page.tsx
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import Brand2 from "@/components/sections/Brand2"
import Categories2 from "@/components/sections/Categories"
import Hero1 from "@/components/sections/Hero1"
import WhyUs1 from "@/components/sections/WhyUs1"
import Layout from "@/components/layout/Layout"
import BrandMarquee from "@/components/BrandMarquee"

// Dynamically import components that use `useSearchParams()`
const Search1 = dynamic(() => import('@/components/sections/Search1'), { ssr: false });
const CarsListing1 = dynamic(() => import('@/components/elements/CarsListing1'), { ssr: false });

export default async function Home() {
  return (
    <main>
      <Layout footerStyle={1}>
        <Hero1 />

        <Suspense>
          <Search1 />
        </Suspense>

        <Brand2 />
        <Categories2 />

        <Suspense>
          <CarsListing1 />
        </Suspense>

        <WhyUs1 />
        <BrandMarquee />
      </Layout>
    </main>
  );
}
