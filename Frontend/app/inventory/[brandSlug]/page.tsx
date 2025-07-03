import Layout from '@/components/layout/Layout';
import { getCarsByBrandSlug } from '@/services/carService';
import { notFound } from 'next/navigation';
import BrandCarFilterClient from '@/components/BrandCarFilterClient';
import Breadcrumbs from '@/components/Breadcrumbs';

export default async function BrandPage({ params }: { params: { brandSlug: string } }) {
    const cars = await getCarsByBrandSlug(params.brandSlug);

    if (!cars || cars.length === 0) {
        return notFound();
    }

    return (
        <Layout footerStyle={1}>
            <div className="container">
            <Breadcrumbs />
            <section className="container py-4">
				<h4>{params.brandSlug.charAt(0).toUpperCase() + params.brandSlug.slice(1)} Brand</h4>
				<BrandCarFilterClient cars={cars} />
			</section>
            </div>
        </Layout>
    );
}
