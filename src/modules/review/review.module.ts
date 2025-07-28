// src/modules/review/review.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewModel, ReviewSchema } from './schemas/review.schema';
import { ReviewService } from './services/review.service';
import { ReviewController } from './controllers/review.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ReviewModel, schema: ReviewSchema }]),
  ],
  providers: [ReviewService],
  controllers: [ReviewController],
  exports: [MongooseModule, ReviewService], // Export MongooseModule and ReviewService if needed elsewhere
})
export class ReviewModule {}
