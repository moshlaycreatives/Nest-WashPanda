import { IsString, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreatePackageDto } from './create-booking.dto';

export class CreateCarDetailsDto {
  @IsString()
  @IsNotEmpty()
  vehicleType: string;

  @ValidateNested()
  @Type(() => CreatePackageDto)
  @IsNotEmpty()
  package: CreatePackageDto;
}
