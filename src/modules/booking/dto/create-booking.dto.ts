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
  ValidateIf,
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

  @IsOptional()
  @ValidateIf((object, value) => value !== null && value !== '')
  @IsEmail()
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

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAddonDto)
  @IsOptional()
  addons: CreateAddonDto[];

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsOptional()
  vehicleMakeAndModel?: string;

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
