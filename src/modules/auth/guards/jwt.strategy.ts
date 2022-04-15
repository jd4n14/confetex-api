import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';
import { AuthPayload } from '../interfaces/auth.payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService, private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      jsonWebTokenOptions: {
        ignoreNotBefore: true,
      },
      secretOrKey: configService.get('auth.key'),
    });
  }

  async validate(payload: AuthPayload) {
    const user = this.authService.validateUser(payload);
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
