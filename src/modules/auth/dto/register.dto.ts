import { IsEmail, IsNotEmpty } from 'class-validator';
import { Role } from '../../users/entities/user.entity';

export class RegisterUser {
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  role: Role = Role.MECHANIC;
}
