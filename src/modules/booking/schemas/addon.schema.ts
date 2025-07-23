import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Addon {
  @Prop({ required: true })
  addonName: string;

  @Prop({ required: true })
  addonPrice: number;
}

export const AddonSchema = SchemaFactory.createForClass(Addon);
