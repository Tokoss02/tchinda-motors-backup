import CarsDetails from '@/components/elements/carcard/cardetails';
import Error404 from '@/app/not-found';
import Layout from '@/components/layout/Layout';
import { getCarsByBrandAndModelSlug } from '@/services/carService';
import { generateCarSlug } from '@/util/slugUtils';
import { Metadata } from "next";



// ✅ Dynamic Metadata for WhatsApp, Facebook, Twitter, etc.
export async function generateMetadata({
  params,
}: {
  params: { brandSlug: string; modelSlug: string; carSlug: string };
}): Promise<Metadata> {
  const { brandSlug, modelSlug, carSlug } = params;
  const siteUrl = "http://localhost:3000";
  const carUrl = `${siteUrl}/cars-details/${brandSlug}/${modelSlug}/${carSlug}`;
  const cars = await getCarsByBrandAndModelSlug(brandSlug, modelSlug);

  if (!cars || cars.length === 0) {
    return {
      metadataBase: new URL("http://localhost:3000"),
      alternates: {
        canonical: carUrl,
      },
      title: "Car Not Found | Tchinda Motors",
      description: "This car may no longer be available.",
    };
  }

  const car = cars.find((car) => generateCarSlug(car) === carSlug);
  if (!car) {
    return {
      metadataBase: new URL("http://localhost:3000"),
      alternates: {
        canonical: carUrl,
      },
      title: "Car Not Found | Tchinda Motors",
      description: "This car may no longer be available.",
    };
  }


  const imageUrl =
    car.images && car.images[0]
      ? car.images[0].startsWith("http")
        ? car.images[0]
        : `${siteUrl}${car.images[0]}`
      : `${siteUrl}/default-car.jpg`;

  const description = `
Buy this ${car.year} ${car.brand} ${car.modelCar}
${car.trimLevel ?? ""}
for sale in Dubai.

${car.engine}L
${car.fuelType}

${car.transmission}

Available for export to Africa,
Europe,
Asia and worldwide.
`;

  return {
    metadataBase: new URL("http://localhost:3000"),
    alternates: {
      canonical: carUrl,
    },
    title: `${car.year} ${car.brand} ${car.modelCar} for Sale in Dubai | Price, Specs & Export | Tchinda Motors`,
    description,
    openGraph: {
      title: `${car.year} ${car.brand} ${car.modelCar} for Sale in Dubai | Price, Specs & Export | Tchinda Motors`,
      description,
      url: carUrl,
      type: "website",
      siteName: "Tchinda Motors",
      locale: "en_US",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: car.name,
        },
      ],
    },

    robots: {
      index: true,
      follow: true,
    },

    twitter: {
      card: "summary_large_image",
      title: `${car.year} ${car.brand} ${car.modelCar} for Sale in Dubai | Price, Specs & Export | Tchinda Motors`,
      description,
      images: [imageUrl],
      creator: "@tchindamotors",
    },

    keywords: [
      `${car.brand} Dubai`,
      `${car.modelCar} Dubai`,
      `${car.brand} ${car.modelCar}`,
      `${car.year} ${car.brand}`,
      `${car.brand} for sale Dubai`,
      `Used ${car.brand} Dubai`,
      `Buy ${car.brand} Dubai`,
      `Export ${car.brand}`,
      `${car.brand} Africa`,
    ],

  };
}


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
