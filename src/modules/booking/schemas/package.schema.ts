import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Package {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;
}

export const PackageSchema = SchemaFactory.createForClass(Package);
