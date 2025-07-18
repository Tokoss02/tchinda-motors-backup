// src/cars/car.service.ts
import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Car } from './schemas/car.schema';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto'; // ✅ Import UpdateCarDto
import { unlinkSync, existsSync } from 'fs'; // 🛠 for deleting old images
import { generateCarSlug } from 'src/utils/slug.util';




@Injectable()
export class CarService {
  constructor(@InjectModel('Car') private readonly carModel: Model<Car>) { }

  //querying cars based on the query
  async find(query: any): Promise<Car[]> {
    try {
      return await this.carModel.find(query).exec();
    } catch (err) {
      console.error('Error querying cars:', err);
      throw new InternalServerErrorException('Error querying cars');
    }
  }



  // Count cars by type
  async countByCarType(): Promise<{ carType: string; count: number }[]> {
    return this.carModel.aggregate([
      { $group: { _id: "$carType", count: { $sum: 1 } } },
      { $project: { carType: "$_id", count: 1, _id: 0 } }
    ]);
  }


  // Count cars by Brand
  async countByBrand(): Promise<{ brand: string; count: number }[]> {
    return this.carModel.aggregate([
      { $group: { _id: "$brand", count: { $sum: 1 } } },
      { $project: { brand: "$_id", count: 1, _id: 0 } }
    ]);
  }


  // NEW CAR FOR HOME PAGE
  async getRecentCars(): Promise<Car[]> {
    return this.carModel.find().sort({ createdAt: -1 }).limit(6).exec();
  }




  // Find a car by ID
  async findById(id: string): Promise<Car> {
    try {
      const car = await this.carModel.findById(id);
      if (!car) {
        throw new NotFoundException('Car not found');
      }
      return car;

    } catch (err) {
      console.error(`Error finding car with ID ${id}:`, err);
      throw err instanceof NotFoundException ? err : new InternalServerErrorException('Error finding car');
    }
  }


  async findBySlugs(brandSlug: string, modelSlug: string): Promise<Car | null> {
    return this.carModel.findOne({ brandSlug, modelSlug }).exec();
  }


  async findByCategory(carType: string): Promise<Car[]> {
    return this.carModel.find({ carType: new RegExp(`^${carType}$`, 'i') }).exec();
  }


  // Get all cars with pagination
  async findAll(page: number = 1, limit: number = 20): Promise<Car[]> {
    try {
      const skip = (page - 1) * limit;
      console.log("Trying to fetch cars....")
      return await this.carModel.find().sort({ createdAt: -1 }).skip(skip).limit(limit).exec();
    } catch (err) {
      console.error('Error retrieving all cars:', err);
      throw new InternalServerErrorException('Error retrieving all cars');
    }
  }

  // ✅ New method: find by brand
  async findByBrand(brand: string): Promise<Car[]> {
    return this.carModel.find({ brand: new RegExp(`^${brand}$`, 'i') }).exec();
  }

  async findByBrandSlug(brandSlug: string): Promise<Car[]> {
    return this.carModel.find({ brandSlug }).exec();
  }

  async findByBrandAndModelSlug(brandSlug: string, modelSlug: string): Promise<Car[]> {
    return this.carModel.find({ brandSlug, modelSlug })
      .sort({ createdAt: -1 }) // ✅ get most recent
      .exec();
  }

  // Create a new car
  async create(createCarDto: CreateCarDto, imageUrls: string[]): Promise<Car> {
    try {
      console.log('Image URLs:', imageUrls);

      // Create a new car instance without slug
      const newCar = new this.carModel({
        ...createCarDto,
        name: `${createCarDto.brand} ${createCarDto.modelCar} ${createCarDto.trimLevel} ${createCarDto.engine}L ${createCarDto.year}`,
        images: imageUrls,
      });

      // Save to generate _id
      const savedCar = await newCar.save();


      // Generate a unique carSlug using model, engine, year, exteriorColor and last 6 of _id
      const uniqueCarSlug = generateCarSlug(
        createCarDto.brand,
        createCarDto.modelCar,
        createCarDto.trimLevel || 'base',
        `${createCarDto.engine}l`,
        String(createCarDto.year),
        createCarDto.exteriorColor,
        (savedCar._id as Types.ObjectId).toString().slice(-6)// last 6 chars of ObjectId
      );
      console.log('✅ Generated Slug:', uniqueCarSlug);
      console.log('🧪 Final image list to save:', imageUrls);

      // Update the carSlug and save again
      savedCar.carSlug = uniqueCarSlug;
      await savedCar.save();

      return savedCar;
    } catch (err) {
      console.error('Error creating car:', err);
      throw new InternalServerErrorException('Error creating car');
    }
  }





  // Update car details
  async update(id: string, updatedData: Partial<Car>, images: Express.Multer.File[]) {
    const existing = await this.carModel.findById(id);
    
    if (!existing) throw new NotFoundException('Car not found');

    if (images.length > 0) {
      updatedData.images = [
        ...(existing.images || []),
        ...images.map(img => `/uploads/cars/${img.filename}`),
      ];
    }

    await this.carModel.updateOne({ _id: id }, updatedData);
    return this.carModel.findById(id);
  }



  // Update car with new images
  async updateWithImages(id: string, updateCarDto: UpdateCarDto, newImages: string[]): Promise<Car> {
    try {
      const car = await this.carModel.findById(id);
      if (!car) {
        throw new NotFoundException('Car not found');
      }

      // Add new uploaded images
      if (newImages.length > 0) {
        const fullImagePaths = newImages.map((img) =>
          img.startsWith('/uploads') ? img : `/uploads/cars/${img}`
        );

        car.images = [...car.images, ...fullImagePaths];
      }

      // Handle deleting old images
      if (updateCarDto['imagesToDelete']) {
        const imagesToDelete: string[] = updateCarDto['imagesToDelete'];

        // Remove from database
        car.images = car.images.filter(img => !imagesToDelete.includes(img));

        // Physically delete files
        imagesToDelete.forEach(imgPath => {
          const fullPath = '.' + imgPath;
          try {
            if (existsSync(fullPath)) unlinkSync(fullPath);
          } catch (err) {
            console.error(`Error deleting file ${imgPath}:`, err);
            throw new InternalServerErrorException(`Error deleting file ${imgPath}`);
          }
        });
      }
      const { images, imagesToDelete, ...rest } = updateCarDto;
      Object.assign(car, rest);

      return await car.save();
    } catch (err) {
      console.error(`Error updating car with ID ${id} and images:`, err);
      throw new InternalServerErrorException('Error updating car with images');
    }
  } 



  // Delete a car
  async remove(id: string): Promise<any> {
    try {
      const car = await this.carModel.findById(id);
      if (!car) {
        throw new NotFoundException('Car not found');
      }

      // Delete associated image files
      for (const imgPath of car.images) {
        const fullPath = '.' + imgPath;
        try {
          if (existsSync(fullPath)) {
            unlinkSync(fullPath);
            console.log(`🗑️ Deleted image: ${fullPath}`);    // Example: /uploads/cars/filename.jpg
          }
        } catch (err) {
          console.warn(`⚠️ Failed to delete image ${imgPath}:`, err);
          // Continue deleting other files even if one fails
        }
      }

      const deletedCar = await this.carModel.findByIdAndDelete(id);
      return deletedCar;
    } catch (err) {
      console.error(`Error deleting car with ID ${id}:`, err);
      throw err instanceof NotFoundException ? err : new InternalServerErrorException('Error deleting car');
    }
  }


  // Get statistics about cars
  async getStats() {
    try {
      const total = await this.carModel.countDocuments();
      const newCars = await this.carModel.countDocuments({ condition: 'New' });
      const usedCars = await this.carModel.countDocuments({ condition: 'Used' });

      return {
        total,
        new: newCars,
        used: usedCars,
      };
    } catch (err) {
      console.error('Error getting car statistics:', err);
      throw new InternalServerErrorException('Error getting car statistics');
    }
  }


  async getUniqueModelsByBrandSlug(brandSlug: string): Promise<string[]> {
    return this.carModel.distinct('modelCar', { brandSlug });
  }
}

