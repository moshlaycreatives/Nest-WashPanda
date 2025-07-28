import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from '../enums';

@Schema({
  timestamps: true,
  versionKey: false,
})
export class User extends Document {
  @Prop({ required: true, unique: true, index: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: String, enum: Object.values(Role), default: Role.Admin })
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);

export const UserModel = User.name;
