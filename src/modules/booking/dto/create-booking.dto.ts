import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsDateString,
  ValidateNested,
  IsOptional,
  IsEmail,
  IsPhoneNumber,
  IsArray,
  IsNumber,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { BookingTimeSlots, PaymentMethods } from '../enums';
import { CreateCarDetailsDto } from './create-car-details.dto';

export class CreatePackageDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}

export class CreateAddonDto {
  @IsString()
  @IsNotEmpty()
  addonName: string;

  @IsNumber()
  @IsNotEmpty()
  addonPrice: number;
}

export class CreateBookingDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsPhoneNumber('PK')
  @IsNotEmpty()
  phoneNumber: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  noOfCars: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateCarDetailsDto)
  @IsNotEmpty()
  carDetails: CreateCarDetailsDto[];

  @IsDateString()
  @IsNotEmpty()
  bookingDate: Date;

  @IsEnum(BookingTimeSlots)
  @IsNotEmpty()
  bookingTimeSlot: BookingTimeSlots;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsEnum(PaymentMethods)
  @IsNotEmpty()
  paymentMethod: PaymentMethods;

  @IsString()
  @IsOptional()
  message?: string;

  @IsNumber()
  @IsNotEmpty()
  totalAmount: number;
}
