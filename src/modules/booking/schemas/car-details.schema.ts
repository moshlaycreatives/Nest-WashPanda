import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Package, PackageSchema } from './package.schema';

@Schema()
export class CarDetails {
  @Prop({ required: true })
  vehicleType: string;

  @Prop({ type: PackageSchema, required: true })
  package: Package;
}

export const CarDetailsSchema = SchemaFactory.createForClass(CarDetails);
