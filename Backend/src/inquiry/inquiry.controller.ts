
import { Controller, Post, Body } from '@nestjs/common';
import { InquiryService } from './inquiry.service'; 
import { CreateInquiryDto } from './dto/create-inquiry.dto';

@Controller('inquiry')
export class InquiryController {
  constructor(private readonly inquiryService: InquiryService) {}

  @Post()
  async create(@Body() createInquiryDto: CreateInquiryDto) {
    return this.inquiryService.create(createInquiryDto);
  }
}