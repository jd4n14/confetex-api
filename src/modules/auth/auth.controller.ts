import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { User } from '../users/entities/user.entity';
import { AuthService } from './auth.service';
import { Login } from './dto/login.dto';
import { RegisterUser } from './dto/register.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  /**
   * Login with a user
   */
  @Post('login')
  async login(@Body() user: Login): Promise<string> {
    return this.authService.login(user);
  }

  /**
   * Return the logged in user
   * @param req 
   * @returns 
   */
  @Get('whoami')
  @UseGuards(AuthGuard('jwt'))
  public async whoami(@Req() req: any): Promise<User> {
    return req.user;
  }

  @Post('register')
  async register(@Body() user: RegisterUser):Promise<User> {
    return this.authService.register(user)
  }
}
