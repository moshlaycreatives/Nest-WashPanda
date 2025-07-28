import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Review extends Document {
  @Prop({ required: true })
  customerName: string;

  @Prop({ required: true })
  carName: string;

  @Prop({ required: true })
  review: string;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);

export const ReviewModel = Review.name;
