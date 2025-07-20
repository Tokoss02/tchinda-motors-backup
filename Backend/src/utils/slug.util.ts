// src/utils/slug.util.ts
export function generateCarSlug(
  brand: string,
  modelCar: string,
  trimLevel: string,
  engine: string,
  year: string,
  exteriorColor: string,
  unique: string
): string {
  return `${slugify(brand)}-${slugify(modelCar)}-${slugify(trimLevel)}-${slugify(engine)}l-${slugify(year)}-${slugify(exteriorColor)}-${unique}`;
}

function slugify(text: string | undefined | null): string {
  if (!text) return 'unknown'; // or ''
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')       // Replace spaces with dashes
    .replace(/[^\w\-]+/g, '')   // Remove non-word characters
    .replace(/\-\-+/g, '-')     // Collapse multiple dashes
    .trim();
}
