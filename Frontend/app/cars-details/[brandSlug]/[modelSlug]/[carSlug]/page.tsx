import CarsDetails from '@/components/elements/carcard/cardetails';
import Error404 from '@/app/not-found';
import Layout from '@/components/layout/Layout';
import { getCarsByBrandAndModelSlug } from '@/services/carService';
import { generateCarSlug } from '@/util/slugUtils'; 

export default async function CarDetailsPage({
  params,
}: {
  params: { brandSlug: string; modelSlug: string; carSlug: string };
}) {
  const { brandSlug, modelSlug, carSlug } = params;

  // Step 1: Get all cars for brand and model
  const cars = await getCarsByBrandAndModelSlug(brandSlug, modelSlug);

  if (!cars || cars.length === 0) return Error404();

  // Step 2: Find the specific car by generated slug
  const car = cars.find((car) => generateCarSlug(car) === carSlug);

  if (!car) return Error404();

  return (
    <main>
      <Layout footerStyle={1}>
        <CarsDetails car={car} />
      </Layout>
    </main>
  );
}
