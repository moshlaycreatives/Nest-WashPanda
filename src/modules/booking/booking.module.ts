import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookingModel, BookingSchema } from './schemas/booking.schema';
import { BookingController } from './controllers/booking.controller';
import { BookingService } from './services/booking.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: BookingModel, schema: BookingSchema }]),
  ],
  providers: [BookingService],
  controllers: [BookingController],
  exports: [MongooseModule],
})
export class BookingModule {}
