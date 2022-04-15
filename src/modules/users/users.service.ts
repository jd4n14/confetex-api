import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { RegisterUser } from '../auth/dto/register.dto';
import { Role, User } from './entities/user.entity';
import { paginate, Paginated, PaginateQuery } from '@common/paginate';

@Injectable()
export class UsersService {
  constructor(private readonly em: EntityManager) {}

  async findById(id: number) {
    return this.em.findOneOrFail(User, { id });
  }

  async findUserByEmail(email: string): Promise<User> {
    return this.em.findOneOrFail(User, { email });
  }

  async create(registerUser: RegisterUser) {
    const user = this.em.create(User, registerUser as any);
    await this.em.persistAndFlush(user);
    return user;
  }

  async all(query: PaginateQuery): Promise<Paginated<User>> {
    return paginate(query, this.em.getRepository(User), {
      sortableColumns: ['id', 'email', 'role', 'productionLine'],
      searchableColumns: ['id', 'email', 'role', 'productionLine'],
      where: {
        role: {
          $in: [Role.MECHANIC, Role.SUPERVISOR],
        },
      },
    });
  }

  async mechanics(): Promise<User[]> {
    return this.em.find(User, { role: Role.MECHANIC });
  }

  async delete(user: User): Promise<void> {
    await this.em.nativeDelete(User, user);
  }
}
