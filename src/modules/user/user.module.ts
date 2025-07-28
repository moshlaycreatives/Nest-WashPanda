import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserModel, UserSchema } from './schemas/user.schema';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserModel, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService, MongooseModule],
})
export class UserModule {}
