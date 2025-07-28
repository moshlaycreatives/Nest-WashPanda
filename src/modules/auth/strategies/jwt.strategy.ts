// src/modules/auth/strategies/jwt.strategy.ts
import {
  Injectable,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common'; // Import InternalServerErrorException
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../dto/jwt-payload.interface';
import { UserService } from '../../user/services/user.service';
import { User } from '../../user/schemas/user.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    // Ensure JWT_SECRET is defined before passing it to super()
    const jwtSecret = configService.get<string>('JWT_SECRET');
    if (!jwtSecret) {
      throw new InternalServerErrorException(
        'JWT_SECRET is not defined in environment variables.',
      );
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret, // Now guaranteed to be a string
    });
  }

  /**
   * Validates the JWT payload. This method is called after the token is successfully decoded.
   * @param payload The decoded JWT payload.
   * @returns The user object if valid.
   * @throws UnauthorizedException if the user is not found or invalid.
   */
  async validate(payload: JwtPayload): Promise<User> {
    const { email, sub: userId } = payload;
    const user = await this.userService.findOneById(userId);

    if (!user || user.email !== email) {
      throw new UnauthorizedException('Invalid token payload');
    }
    return user;
  }
}
