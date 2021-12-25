import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { User } from '../users/entities/user.entity';
import { AuthService } from './auth.service';
import { Login } from './dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() user: Login): Promise<string> {
    return this.authService.login(user);
  }

  @Get('whoami')
  @UseGuards(AuthGuard('jwt'))
  public async whoami(@Req() req: any): Promise<User> {
    return req.user;
  }
}
