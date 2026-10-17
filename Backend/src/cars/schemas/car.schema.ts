import { Schema, Document } from 'mongoose';
import slugify from 'slugify';

export interface Car extends Document {
  brand: string;
  name: string;
  modelCar: string;
  year?: number;
  price?: number;
  images: string[];
  mileage?: number;
  seats?: number;
  engine?: number;
  exteriorColor?: string;
  condition: 'New' | 'Used';
  carType: 'SUV' | 'Crossover' | 'Sedan' | 'Pickup' | 'Hatchback' | 'Coupe' | 'Truck' | 'Minivan' | 'Bus' | 'Van' | 'Luxury' | 'Jeep';
  fuelType: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid';
  transmission: 'Manual' | 'Automatic' | 'CVT';
  videoUrl: string;
  carSlug: string;
  brandSlug: string;
  modelSlug: string;
  DriveType: 'FWD' | 'RWD' | '4WD' | 'AWD';
  trimLevel?: string;
  interiorColor?: string;
  horsepower?: number;
  serviceHistory?: 'Yes' | 'No';
  cylinders?: number;
  steeringSide?: string;
  numberOfDoors?: number;
  wheelSize?: number;
  exportStatus?: string;
  interior?: string[];
  exterior?: string[];
  safety?: string[];
  otherFeatures?: string[];
  comfortConvenience?: string[];
  torque?: number;
  length?: number;
  width?: number;
  height?: number;
  wheelbase?: number;
  groundClearance?: number;
  curbWeight?: number;
  steering?: 'Left Hand Drive (LHD)' | 'Right Hand Drive (RHD)';
  doors?: number;
  upholstery?: 'Fabric' | 'Leather';
  CarStatus?: 'Booked' | 'Sold' | 'Available' | 'Out Stock' | 'Coming Soon';
  fuelCapacity?: number;
  // ✅ Updated
  features: {
    interior?: string[];
    exterior?: string[];
    safety?: string[];
    comfortConvenience?: string[];
    otherFeatures?: string[];
  };
}

export const CarSchema = new Schema<Car>(
  {
    //uniqueCarSlug: { type: String, required: true },
    name: { type: String, required: true },
    brand: { type: String, required: true },
    modelCar: { type: String, required: true },
    engine: { type: Number, required: false },
    year: { type: Number },
    exteriorColor: { type: String },
    condition: { type: String, required: false, enum: ['New', 'Used'] },
    price: { type: Number, required: false },
    images: { type: [String], required: true },
    mileage: { type: Number },
    seats: { type: Number },
    fuelType: { type: String, required: false, enum: ['Petrol', 'Diesel', 'Electric', 'Hybrid'] },
    transmission: { type: String, required: false, enum: ['Manual', 'Automatic', 'CVT'] },
    fuelCapacity: { type: Number, required: false },

    CarStatus: { type: String, enum: ['Booked', 'Available', 'Sold', 'Out Stock', 'Coming Soon'], default: 'Available' },

    carType: {
      type: String,
      required: false,
      enum: ['SUV', 'Crossover', 'Sedan', 'Pickup', 'Coupe', 'Hatchback', 'Truck', 'Minivan', 'Bus', 'Van', 'Luxury', 'Jeep'],
    },
    DriveType: { type: String, required: false, enum: ['FWD', 'RWD', '4WD', 'AWD'] },
    videoUrl: { type: String },


    // Feature categories
    features: {
      interior: { type: [String], default: [] },
      exterior: { type: [String], default: [] },
      safety: { type: [String], default: [] },
      comfortConvenience: { type: [String], default: [] },
      otherFeatures: { type: [String], default: [] },
    },


    // Slugs
    carSlug: { type: String },
    brandSlug: { type: String },
    modelSlug: { type: String },

    // Specs
    trimLevel: { type: String, required: false },
    interiorColor: { type: String },
    horsepower: { type: Number },
    torque: { type: Number },
    serviceHistory: { type: String, enum: ['Yes', 'No'] },
    cylinders: { type: Number },
    numberOfDoors: { type: Number },
    wheelSize: { type: Number },
    exportStatus: { type: String },

    // Dimensions
    length: { type: Number },
    width: { type: Number },
    height: { type: Number },
    wheelbase: { type: Number },
    groundClearance: { type: Number },
    curbWeight: { type: Number },

    // Misc
    steering: { type: String, enum: ['Left Hand Drive (LHD)', 'Right Hand Drive (RHD)'] },
    doors: { type: Number },
    upholstery: { type: String, enum: ['Fabric', 'Leather', 'Vinyl'] },
  },
  { timestamps: true }
);

// Slug generation middleware
CarSchema.pre<Car>('save', function (next) {
  if (this.isModified('brand')) {
    this.brandSlug = slugify(this.brand, { lower: true });
  }
  if (this.isModified('modelCar')) {
    this.modelSlug = slugify(this.modelCar, { lower: true });
  }
  const slugBase = `${this.brand} ${this.modelCar}${this.year ? ' ' + this.year : ''}`;
  this.carSlug = slugify(slugBase, { lower: true });

  next();
});

export { Document };
