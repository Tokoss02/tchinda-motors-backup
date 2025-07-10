import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  @Get()
  getRoot(): string {
    return '✅ Backend is running on Railway!';
  }
  // This endpoint can be used to check the status of the backend
  constructor(private readonly appService: AppService) {}

  @Get()
  getStatus() {
    return this.appService.getStatus();
  }


@Get('/ping')
getPing() {
  return { message: '✅ Backend is alive and reachable' };
}
}
