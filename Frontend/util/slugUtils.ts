// utils/slugUtils.ts
import { Car } from '@/types/carvalue';

export function generateCarSlug(car: Car): string {
  const brand = car.brand || 'Unknown';
  const model = car.modelCar || 'Unknown';
  const trimLevel = car.trimLevel || 'Unknown';
  const engine = car.engine?.toString() || 'Unknown';
  const year = car.year?.toString() || 'Unknown';
  const exteriorColor = car.exteriorColor || 'Unknown';
  const unique = (car._id as string)?.slice(-6) || 'Unknown';
  // Log if any key info is missing
  if (!car.year || !car.brand || !car.modelCar || !car.trimLevel || !car.engine || !car.exteriorColor ) {
    console.warn('Missing data for slug:', { brand, model, trimLevel, engine, year, exteriorColor, _id: car._id });
    console.log('Generating slug for car:', car);
  }

  return `${brand} ${model} ${trimLevel} ${engine}l ${year} ${exteriorColor} ${unique}`
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '');
}
