import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDto } from 'src/modules/user/dto';

@Controller('auth') // Base route for authentication operations
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Handles user login and returns a JWT access token.
   * @param loginDto DTO containing user's email and password.
   * @returns An object with the access token.
   */
  @Post('login')
  @HttpCode(HttpStatus.OK) // Return 200 OK on successful login
  async login(
    @Body(new ValidationPipe()) loginDto: LoginDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.login(loginDto);
  }
}
