// src/cars/car.controller.ts
import { Body, Controller, Get, Post, Param, Delete, Query, UseGuards, Patch, UseInterceptors, UploadedFiles, BadRequestException, } from '@nestjs/common';
import { CarService } from './car.service';
import { Car } from './schemas/car.schema';
import { CreateCarDto } from './dto/create-car.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { UpdateCarDto } from './dto/update-car.dto';
import { multerConfig } from 'src/Helpers/multer.config';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Req } from '@nestjs/common';
import path from 'path';
import { ContactDto } from 'src/contact/ContactDto';
import axios from 'axios';
import { MailService } from 'src/email/mail.service';









@Controller('cars')
// @UseGuards(JwtAuthGuard)
export class CarController {
  constructor(
    private readonly carService: CarService,
    private readonly mailService: MailService // ✅ inject mailService
  ) {}
  

  /////////////////////////
  //GET FUBCTION
  //////////////////////////



  @Get('by-category/:carType')
  async getCarsByCategory(@Param('carType') carType: string) {
    return this.carService.findByCategory(carType);
  }

  @Get('count-by-type')
  async countByType(): Promise<{ carType: string; count: number }[]> {
    return this.carService.countByCarType();
  }


  @Get('count-by-brand')
  async countByBrandItem(): Promise<{ brand: string; count: number }[]> {
    return this.carService.countByBrand();
  }

    @Get('brand/:brandSlug/models')
  getModelsByBrandSlug(@Param('brandSlug') slug: string) {
    return this.carService.getUniqueModelsByBrandSlug(slug);
  }

  // ✅ Admin cars list (with auth & role check)
  @Get('')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('admin')
  async getAllCarsForAdmin(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 100
  ): Promise<Car[]> {
    console.log("VSLL=================== ")
    return this.carService.findAll(page, limit);
  }

  // new arrival at home page
  @Get('recent')
  async getRecentCars(): Promise<Car[]> {
    return this.carService.getRecentCars();
  }

  // GET /cars/brand/:brandSlug
  @Get('brand/:brandSlug')
  async getByBrand(@Param('brandSlug') brandSlug: string) {
    return this.carService.findByBrandSlug(brandSlug);
  }


  // GET /cars/brand/:brandSlug/model/:modelSlug
  @Get('brand/:brandSlug/model/:modelSlug')
  async getByBrandAndModel(
    @Param('brandSlug') brandSlug: string,
    @Param('modelSlug') modelSlug: string,
  ) {
    return this.carService.findByBrandAndModelSlug(brandSlug, modelSlug);
  }


  @Get(':brandSlug/:modelSlug')
  getCarBySlugs(
    @Param('brandSlug') brandSlug: string,
    @Param('modelSlug') modelSlug: string,
  ) {
    return this.carService.findBySlugs(brandSlug, modelSlug);
  }

  

  // 🆕 CREATE car with images upload
  @Post()
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('admin')
  @UseInterceptors(FilesInterceptor('images', 20, multerConfig))
  async create(
    @UploadedFiles() files: Express.Multer.File[], // Get the uploaded file
    @Body() createCarDto: CreateCarDto,  // Get the DTO data

  ): Promise<Car> {
    console.log('Received files:', files);
    console.log('Saving to:', path.join(process.cwd(), 'uploads', 'cars'));
    const images = files?.map((files) => `/uploads/cars/${files.filename.replace(/\\/g, '/')}`)
    console.log('Mapped image URLs:', images);
    return this.carService.create(createCarDto, images); // Pass strings to service
  }


 
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('admin')
  @Patch(':id')
@UseInterceptors(FilesInterceptor('images', 20, multerConfig))
async updateCar(
  @Param('id') id: string,
  @Body() updateCarDto: UpdateCarDto,
  @UploadedFiles() files: Express.Multer.File[],
): Promise<Car> {
  console.log('Files received:', files);

  // Handle new images
  const newImages = files?.map(file =>
    `/uploads/cars/${file.filename.replace(/\\/g, '/')}`
  ) || [];

  // Handle existing images from the form
  let existingImages: string[] = [];

  if (typeof updateCarDto.existingImages === 'string') {
    try {
      existingImages = JSON.parse(updateCarDto.existingImages);
    } catch (err) {
      existingImages = [updateCarDto.existingImages];
    }
  } else if (Array.isArray(updateCarDto.existingImages)) {
    existingImages = updateCarDto.existingImages;
  }

  // Combine both
  const allImages = [...existingImages, ...newImages];

  // Pass all combined images to the service
  return this.carService.updateWithImages(id, updateCarDto, allImages);
}


@Post('contact')
async handleContact(@Body() body: any) {
	const { /*captchaToken,*/ ...contactData } = body;

	/*const captchaRes = await axios.post(
		`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captchaToken}`
	);

	if (!captchaRes.data.success || captchaRes.data.score < 0.5) {
		throw new BadRequestException('Captcha verification failed');
	}*/

	await this.mailService.sendContactEmail(contactData);
	return { message: 'Message sent successfully' };
}


  @Delete(':id')
  async remove(@Param('id') id: string): Promise<any> {
    return this.carService.remove(id);
  }


  @Get('stats')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('admin')
  async getCarStats() {
    return this.carService.getStats();
  }


  @Get('/filters')
  async getCarFilters(
    @Query('carType') carType: string,
    @Query('condition') condition: 'New' | 'Used' | 'all' = 'all',
  ) {
    const query: any = {};

    if (carType && carType !== 'all') query.carType = carType;
    if (condition && condition !== 'all') query.condition = condition;

    const cars = await this.carService.find(query);
    const brands = [...new Set(cars.map(car => car.brand))];
    const models = [...new Set(cars.map(car => car.modelCar))];
    const fuelTypes = [...new Set(cars.map(car => car.fuelType))];
    const transmissions = [...new Set(cars.map(car => car.transmission))];

    return { brands, models, fuelTypes, transmissions };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Car> {
    return this.carService.findById(id);
  }


}
