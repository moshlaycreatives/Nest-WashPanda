import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Addon, AddonSchema } from './addon.schema';
import { Package, PackageSchema } from './package.schema';

@Schema()
export class CarDetails {
  @Prop({ required: true })
  vehicleType: string;

  @Prop({ type: PackageSchema, required: true })
  package: Package;

  @Prop({ type: [AddonSchema], default: [] })
  addons: Addon[];

  @Prop()
  vehicleMake?: string;

  @Prop()
  vehicleModel?: string;
}

export const CarDetailsSchema = SchemaFactory.createForClass(CarDetails);
