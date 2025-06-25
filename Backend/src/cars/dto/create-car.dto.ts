import {
  IsString,
  IsInt,
  Min,
  Max,
  IsNumber,
  IsOptional,
  IsArray,
  IsIn,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { slugify } from 'transliteration';
import { COMFORT_CONVENIENCE_FEATURES, INTERIOR_FEATURES, EXTERIOR_FEATURES, SAFETY_FEATURES, CAR_FEATURES } from 'type/features';


export class CreateCarDto {
  // Identification
  @IsOptional()
  @IsString({ message: 'Name must be a string' })
  name?: string;

  @IsString({ message: 'Brand must be a string' })
  @Transform(({ value }) => value.trim())
  brand!: string;

  @IsOptional()
  @IsString()
  @Transform(({ obj }) => slugify(obj.brand?.toLowerCase() || ''), { toClassOnly: true })
  brandSlug?: string;

  @IsString({ message: 'Model must be a string' })
  @Transform(({ value }) => value.trim())
  modelCar!: string;

  @IsOptional()
  @IsString()
  @Transform(({ obj }) => slugify(obj.modelCar?.toLowerCase() || ''), { toClassOnly: true })
  modelSlug?: string;

  // Media
  @IsOptional()
  @IsString()
  videoUrl?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];

    @IsOptional()
  @IsArray()
  @IsString({ each: true })
  existingImages?: string[];


  // Specs
  @IsString({ message: 'Drive type must be a string' })
  @IsIn(['FWD', 'RWD', '4WD', 'AWD'], { message: 'Invalid Drive type' })
  DriveType!: string;

  @Type(() => Number)
  @IsNumber({}, { message: 'Engine must be a number' })
  @Min(0.05, { message: 'Engine cannot be less than 0.05 Liters' })
  @Max(8.4, { message: 'Engine cannot be more than 8.4 Liters' })
  engine?: number;

  @Type(() => Number)
  @IsInt({ message: 'Year must be an integer' })
  @Min(1886, { message: 'Year must be 1886 or later' })
  @Max(new Date().getFullYear() + 1, { message: 'Year cannot be in the far future' })
  year!: number;

  @Type(() => Number)
  @IsNumber({}, { message: 'Price must be a number' })
  price!: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'Mileage must be a number' })
  mileage?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'Seats must be a number' })
  seats?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'Doors must be a number' })
  doors?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'Wheel Size must be a number' })
  wheelSize?: number;

  @IsOptional()
  @IsString({ message: 'TrimLevel must be a string' })
  trimLevel!: string;

  // Performance
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'Cylinder must be a number' })
  cylinders?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'Horsepower must be a number' })
  horsepower?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'Torque must be a number' })
  torque?: number;

  // Dimensions
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'Length must be a number' })
  length?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'Width must be a number' })
  width?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'Height must be a number' })
  height?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'Wheelbase must be a number' })
  wheelbase?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'Ground Clearance must be a number' })
  groundClearance?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'Curb Weight must be a number' })
  curbWeight?: number;

  // Classification
  @IsString({ message: 'Car type must be a string' })
  @IsIn(
    ['SUV', 'Crossover', 'Sedan', 'Pickup', 'Hatchback', 'Truck', 'Coupe', 'Minivan', 'Bus', 'Van', 'Luxury', 'Jeep'],
    { message: 'Invalid car type' }
  )
  carType!: string;

  @IsString({ message: 'Condition must be a string' })
  @IsIn(['New', 'Used'], { message: 'Condition must be either New or Used' })
  condition!: string;

  @IsString({ message: 'Transmission must be a string' })
  @IsIn(['Manual', 'Automatic'], { message: 'Transmission must be Manual or Automatic' })
  transmission!: string;

  @IsString({ message: 'Fuel type must be a string' })
  @IsIn(['Petrol', 'Diesel', 'Electric', 'Hybrid'], { message: 'Invalid fuel type' })
  fuelType!: string;

  // Options
  @IsOptional()
  @IsString({ message: 'Color must be a string' })
  color!: string;

  @IsOptional()
  @IsString({ message: 'Steering must be a string' })
  @IsIn(['Left Hand Drive (LHD)', 'Right Hand Drive (RHD)'], { message: 'Steering must be either LHD or RHD' })
  steering?: string;

  @IsOptional()
  @IsString({ message: 'Upholstery must be a string' })
  @IsIn(['Fabric', 'Leather'], { message: 'Upholstery must be either Fabric or Leather' })
  upholstery?: string;

  // Features
  @IsOptional()
  @IsIn(COMFORT_CONVENIENCE_FEATURES, { each: true })
  comfortConvenience!: string[];

  @IsOptional()
  @IsIn(INTERIOR_FEATURES, { each: true })
  interior!: string[];

  @IsOptional()
  @IsIn(EXTERIOR_FEATURES, { each: true })
  exterior!: string[];

  @IsOptional()
  @IsIn(SAFETY_FEATURES, { each: true })
  safety!: string[];
  
  @IsOptional()
  @IsIn(CAR_FEATURES, { each: true })
  otherFeatures!: string[];


  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  features?: string[];
}
