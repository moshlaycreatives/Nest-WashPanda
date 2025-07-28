import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
  BookingStatus,
  BookingTimeSlots,
  PaymentMethods,
  PaymentStatus,
} from '../enums';
import { CarDetails, CarDetailsSchema } from './car-details.schema';

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Booking extends Document {
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  noOfCars: number;

  @Prop({ type: [CarDetailsSchema], required: true })
  carDetails: CarDetails[];

  @Prop({ required: true })
  bookingDate: Date;

  @Prop({
    type: String,
    enum: Object.values(BookingTimeSlots),
    required: true,
  })
  bookingTimeSlot: BookingTimeSlots;

  @Prop({ required: true })
  address: string;

  @Prop({
    type: String,
    enum: Object.values(PaymentMethods),
    required: true,
  })
  paymentMethod: PaymentMethods;

  @Prop()
  message?: string;

  @Prop({
    type: String,
    enum: Object.values(BookingStatus),
    default: BookingStatus.Pending,
  })
  bookingStatus: BookingStatus;

  @Prop({
    type: String,
    enum: Object.values(PaymentStatus),
    default: PaymentStatus.UnPaid,
  })
  paymentStatus: PaymentStatus;

  @Prop({ required: true })
  totalAmount: number;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);

export const BookingModel = Booking.name;
