import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import * as fs from 'fs';
import * as dotenv from 'dotenv';
import { HttpsOptions } from '@nestjs/common/interfaces/external/https-options.interface';

dotenv.config();

async function bootstrap() {
  let httpsOptions: HttpsOptions | undefined = undefined;

  if (
    process.env.NODE_ENV === 'PRODUCTION' &&
    process.env.IS_SSL_ENABLED === 'YES'
  ) {
    const privateKeyPath = process.env.PRIVKEY_PEM;
    const certificatePath = process.env.FULLCHAIN_PEM;

    if (!privateKeyPath || !certificatePath) {
      console.error(
        'Error: For SSL in production, PRIVKEY_PEM and FULLCHAIN_PEM must be defined in the .env file.',
      );

      process.exit(1);
    }

    try {
      httpsOptions = {
        key: fs.readFileSync(privateKeyPath),
        cert: fs.readFileSync(certificatePath),
      };
    } catch (err) {
      console.error('Error reading SSL certificate or key files:', err);
      process.exit(1);
    }
  }

  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });

  const port = process.env.PORT || 8585;

  app.useGlobalInterceptors(new LoggingInterceptor());
  app.enableCors();

  await app.listen(port);

  const protocol = httpsOptions ? 'https' : 'http';
  const environment = process.env.NODE_ENV || 'development';
  const ip_address =
    process.env.NODE_ENV === 'PRODUCTION'
      ? process.env.STATIC_IP
      : process.env.LOCAL_IP;
  console.log(
    `Server is running in ${environment} mode on ${protocol}://${ip_address}:${port}`,
  );
}

bootstrap();
