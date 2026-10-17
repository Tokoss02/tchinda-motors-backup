import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
 
  @Get()
  getRoot(): string {
    return '✅ Backend is running!';
  }

  @Get('/ping')
getPing() {
  return { message: '✅ Backend is alive and reachable' };
}

}
