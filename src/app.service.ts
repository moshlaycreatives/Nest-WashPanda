// src/app.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return "<h1 style='display: flex; justify-content: center;   align-items: center; font-size:9rem; margin-top:10rem;'>Server is running.</h1>";
  }
}
