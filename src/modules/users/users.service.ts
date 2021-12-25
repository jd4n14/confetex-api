import { EntityManager } from '@mikro-orm/mariadb';
import { Injectable } from '@nestjs/common';
import { RegisterUser } from '../auth/dto/register.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly em: EntityManager) {}

  async findUserByEmail(email: string): Promise<User> {
    return this.em.findOneOrFail(User, { email });
  }

  async create(registerUser: RegisterUser) {
    const user = this.em.create(User, registerUser);
    await this.em.persistAndFlush(user);
    return user;
  }
}
