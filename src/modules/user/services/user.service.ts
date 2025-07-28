import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserModel } from '../schemas/user.schema';
import { CreateUserDto } from '../dto/create-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel) private readonly userModel: Model<User>,
  ) {}

  /**
   * Hashes a plain text password using bcrypt.
   * @param password The plain text password to hash.
   * @returns The hashed password.
   */
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

  /**
   * Creates a new user in the database.
   * @param createUserDto Data for creating the user.
   * @returns The newly created user document.
   * @throws ConflictException if a user with the given email already exists.
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, password } = createUserDto;

    const existingUser = await this.userModel.findOne({ email }).exec();
    if (existingUser) {
      throw new ConflictException(`User with email "${email}" already exists.`);
    }

    const hashedPassword = await this.hashPassword(password);

    const newUser = new this.userModel({
      email,
      password: hashedPassword,
    });
    return newUser.save();
  }

  /**
   * Finds a user by their email address.
   * @param email The email of the user to find.
   * @returns The user document, or null if not found.
   */
  async findOneByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  /**
   * Finds a user by their ID.
   * @param id The ID of the user to find.
   * @returns The user document.
   * @throws NotFoundException if the user is not found.
   */
  async findOneById(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found.`);
    }
    return user;
  }

  /**
   * Compares a plain text password with a hashed password.
   * @param plainPassword The plain text password.
   * @param hashedPassword The hashed password from the database.
   * @returns True if passwords match, false otherwise.
   */
  async comparePasswords(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}
