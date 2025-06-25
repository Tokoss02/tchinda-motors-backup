import Layout from '@/components/layout/Layout'
import { getCarsByCategory } from '@/services/carService'
import { notFound } from 'next/navigation'
import ModelCarFilterClient from '@/components/ModelCarFilterClient';


export default async function CategoryPage({ params }: { params: { category: string } }) {
    const category = decodeURIComponent(params.category)
    const cars = await getCarsByCategory(category)

    if (!cars || cars.length === 0) {
        return notFound()
    }

    return (
        <Layout footerStyle={1}>
            <section className="container py-4">
                <h2 className="title-svg heading-4 mb-0 neutral-1000 mb-2 text-capitalize">{category} Cars</h2>
                <div className="row">
                    <ModelCarFilterClient cars={cars} />
                </div>
            </section>
        </Layout>
    )
}
