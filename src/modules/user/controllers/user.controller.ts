import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get,
  Param,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../schemas/user.schema';
import { ParseObjectIdPipe } from 'src/common/pipes/parse-objectid.pipe';
import { Types } from 'mongoose';

@Controller('users') // Base route for user-related operations
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Endpoint to create a new user.
   * This might be used for registration, but for admin creation,
   * it's handled on app startup.
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  /**
   * Endpoint to get a user by ID.
   * (Example of a typical user endpoint)
   */
  @Get(':id')
  async findOne(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
  ): Promise<User> {
    return this.userService.findOneById(id.toHexString());
  }

  // More endpoints like update, delete, or specific auth endpoints will go here.
}
