import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { WashPackage, WashPackageSchema } from './washPackage.schema';
import { Document } from 'mongoose';
import { Addon, AddonSchema } from './addon.schema';
import { BOOKING_TIME_SLOT, PAYMENT_METHOD } from 'src/common/constants';

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Booking extends Document {
  @Prop({ required: true })
  vehicleType: string;

  @Prop({ type: WashPackageSchema, required: true })
  washPackage: WashPackage;

  @Prop({ type: [AddonSchema], default: [] })
  addons: Addon[];

  @Prop({ required: true })
  bookingDate: Date;

  @Prop({
    type: String,
    enum: Object.values(BOOKING_TIME_SLOT), // ["Morning", "Noon", "Evening", "Night"]
    required: true,
  })
  bookingTimeSlot: BOOKING_TIME_SLOT;

  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ required: true })
  address: string;

  @Prop()
  vehicleMake?: string;

  @Prop()
  vehicleModel?: string;

  @Prop({
    type: String,
    enum: Object.values(PAYMENT_METHOD), // ["Cash", "Online Payment"]
    required: true,
  })
  paymentMethod: PAYMENT_METHOD;

  @Prop()
  message?: string;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
