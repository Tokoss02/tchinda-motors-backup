import Layout from '@/components/layout/Layout';
import { getCarsByBrandAndModelSlug } from '@/services/carService';
import { notFound } from 'next/navigation';
import ModelCarFilterClient from '@/components/ModelCarFilterClient';
import Breadcrumbs from '@/components/Breadcrumbs';

export default async function ModelPage({ params }: { params: { brandSlug: string, modelSlug: string } }) {
    const cars = await getCarsByBrandAndModelSlug(params.brandSlug, params.modelSlug);

    if (!cars || cars.length === 0) {
        return notFound();
    }

    const formatSlug = (slug: string) =>
		slug
			.split('-')
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');

    return (
        <Layout footerStyle={1}>
            <div className="container">
            <Breadcrumbs />
            <section className="container py-4">
				<h4>
					{formatSlug(params.brandSlug)} / {formatSlug(params.modelSlug)}
				</h4>
				<ModelCarFilterClient cars={cars} /> 
			</section>
            </div>
        </Layout >
    );
}
