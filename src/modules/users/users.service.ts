import { EntityManager } from '@mikro-orm/mariadb';
import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly em: EntityManager) {}

  async findUserByEmail(email: string): Promise<User> {
    return this.em.findOneOrFail(User, { email });
  }
}
