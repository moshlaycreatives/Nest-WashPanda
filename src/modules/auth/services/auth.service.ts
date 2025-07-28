import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../user/services/user.service';
import { LoginDto } from '../../user/dto/login-user.dto';
import { JwtPayload } from '../dto/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  /** _____ validateUser _____ */
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await this.userService.comparePasswords(
      password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  /** _____ Login _____ */
  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const user = await this.validateUser(loginDto.email, loginDto.password);

    const payload: JwtPayload = {
      email: user.email,
      role: user.role,
      sub: user._id.toHexString(),
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
