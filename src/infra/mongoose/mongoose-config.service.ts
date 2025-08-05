import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  constructor(private configService: ConfigService) {}

  createMongooseOptions():
    | Promise<MongooseModuleOptions>
    | MongooseModuleOptions {
    const MONGO_URI = this.configService.get('MONGO_URI');
    console.log('MONGO_URI:', MONGO_URI);

    if (!MONGO_URI) {
      throw new Error(
        'MONGO_URI is not defined in the environment variables. Please check your .env file.',
      );
    }

    return {
      uri: MONGO_URI,
    };
  }
}
