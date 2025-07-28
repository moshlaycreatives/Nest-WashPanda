import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = 8585;

  app.useGlobalInterceptors(new LoggingInterceptor());

  await app.listen(port);

  console.log(`Server is Running on http://localhost:${port}`);
}

bootstrap();
