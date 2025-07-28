// src/modules/review/dto/create-review.dto.ts
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  @IsNotEmpty()
  customerName: string;

  @IsString()
  @IsNotEmpty()
  carName: string;

  @IsString()
  @IsNotEmpty()
  review: string;
}
