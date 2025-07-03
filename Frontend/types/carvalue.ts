export interface Car {

  _id: string;
  name: string;
  brand: string;
  images: string[];
  slug: string;
  mileage: number;
  transmission: 'Manual' | 'Automatic';
  fuelType: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid';
  seats: number;
  brandSlug: string;
  modelCar: string;
  modelSlug: string;
  year: number;
  condition: 'New' | 'Used';
  price: number;
  DriveType: 'FWD' | 'RWD' | '4WD' | 'AWD';
  carType: | 'SUV'
  | 'Crossover'
  | 'Sedan'
  | 'Pickup'
  | 'Hatchback'
  | 'Coupe'
  | 'Truck'
  | ' '
  | 'Bus'
  | 'Van'
  | 'Luxury'
  | 'Jeep';
  amenities?: string;
  description?: string;
  exteriorColor?: string;
  engine: number;
  newImages?: File[]; // for new files to upload
  videoUrl?: string;
  carSlug: string;
  trimLevel: string;
  interiorColor: string;
  serviceHistory: 'Yes' | 'No';
  cylinders: number;
  numberOfDoors: number;
  wheelSize: number;
  exportStatus: string;
  horsepower: number;
  torque: number;
  length: number;
  width: number;
  height: number;
  wheelbase: number;
  groundClearance?: number;
  curbWeight: number;
  steering: 'Left Hand Drive (LHD)' | 'Right Hand Drive (RHD)';
  doors: number;
  upholstery: 'Fabric' | 'Leather';

  features: {
    interior: string[];
    exterior: string[];
    safety: string[];
    comfortConvenience: string[];
    otherFeatures: string[];
  };


}

export const emptyCar: Car = {
  _id: '',
  name: '',
  brand: '',
  brandSlug: '',
  carSlug: '',
  slug: '',
  images: [],
  mileage: 0,
  transmission: 'Automatic',
  fuelType: 'Petrol',
  seats: 0,
  modelCar: '',
  interiorColor: '',
  serviceHistory: 'No',
  cylinders: 0,
  numberOfDoors: 0,
  wheelSize: 0,
  exportStatus: '',
  modelSlug: '',
  year: new Date().getFullYear(),
  condition: 'New',
  DriveType: 'FWD',
  price: 0,
  carType: 'SUV',
  description: '',
  exteriorColor: '',
  engine: 0,
  newImages: [],
  trimLevel: '',
  horsepower: 0,
  torque: 0,
  length: 0,
  width: 0,
  height: 0,
  wheelbase: 0,
  groundClearance: 0,
  curbWeight: 0,
  steering: 'Left Hand Drive (LHD)',
  doors: 0,
  upholstery: 'Fabric',
  features: {
    interior: [],
    exterior: [],
    safety: [],
    comfortConvenience: [],
    otherFeatures: [],
  },
};

export interface Filter {
  name: string[];
  fuelType: string[];
  amenities: string[];
  priceRange: [number, number];
  carType: string[];
}
