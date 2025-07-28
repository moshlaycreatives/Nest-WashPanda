import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreatePackageDto, CreateAddonDto } from './create-booking.dto'; // Re-use existing DTOs

export class CreateCarDetailsDto {
  @IsString()
  @IsNotEmpty()
  vehicleType: string;

  @ValidateNested()
  @Type(() => CreatePackageDto)
  @IsNotEmpty()
  package: CreatePackageDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAddonDto)
  @IsOptional()
  addons: CreateAddonDto[];

  @IsString()
  @IsOptional()
  vehicleMake?: string;

  @IsString()
  @IsOptional()
  vehicleModel?: string;
}
