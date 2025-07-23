import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class WashPackage {
  @Prop({ required: true })
  packageName: string;

  @Prop({ required: true })
  packagePrice: string;
}

export const WashPackageSchema = SchemaFactory.createForClass(WashPackage);
