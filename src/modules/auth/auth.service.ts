import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { Login } from './dto/login.dto';
import { RegisterUser } from './dto/register.dto';
import { AuthPayload } from './interfaces/auth.payload';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userService: UsersService,
  ) {}

  async validateToken(token: string): Promise<AuthPayload> {
    try {
      return this.jwtService.verify(token);
    } catch (e) {
      throw new UnauthorizedException(`Invalid JWT token: ${e}`);
    }
  }

  async validateUser(user: AuthPayload): Promise<User> {
    return this.userService.findUserByEmail(user.email);
  }

  async createToken(user: User): Promise<string> {
    const payload: AuthPayload = {
      email: user.email,
      iss: this.configService.get('server.url'),
      roles: [user.role.toString()],
      sub: user.id.toString(),
      aud: this.configService.get('server.url'),
    };
    return this.jwtService.signAsync(payload, {
      expiresIn: this.configService.get('auth.expiresIn'),
      secret: this.configService.get('auth.key'),
    });
  }

  async login(payload: Login): Promise<string> {
    const user = await this.userService.findUserByEmail(payload.email);
    if (!user) throw new UnauthorizedException('El usuario no esta registrado');
    const isValid = await user.validatePassword(payload.password);

    if (!isValid) throw new UnauthorizedException('Contraseña incorrecta');
    return this.createToken(user);
  }

  async register(user: RegisterUser): Promise<User> {
    return this.userService.create(user);
  }
}
