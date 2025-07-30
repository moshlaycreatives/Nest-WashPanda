import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Gallery {
  @Prop({ required: true })
  videoUrl: string;
}

export type GalleryDocument = Gallery & Document;
export const GallerySchema = SchemaFactory.createForClass(Gallery);
