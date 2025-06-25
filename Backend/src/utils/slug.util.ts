// src/utils/slug.util.ts
export function generateCarSlug(
  brand: string,
  modelCar: string,
  trimLevel: string,
  engine: string,
  year: string,
  color: string,
  unique: string
): string {
  return `${slugify(brand)}-${slugify(modelCar)}-${slugify(trimLevel)}-${slugify(engine)}-${slugify(year)}-${slugify(color)}-${unique}`;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')       // Replace spaces with dashes
    .replace(/[^\w\-]+/g, '')   // Remove non-word characters
    .replace(/\-\-+/g, '-')     // Collapse multiple dashes
    .trim();
}
