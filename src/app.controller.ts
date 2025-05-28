import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { JsonResponse } from './Utils/JsonResponse';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  BasePath(): JsonResponse {
    return this.appService.basePath();
  }
  
}
