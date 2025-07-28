// src/app.controller.ts
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller() // No specific path prefix for the controller itself
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get() // This decorator makes this method handle GET requests to the root path ("/")
  getHello(): string {
    return this.appService.getHello();
  }
}
