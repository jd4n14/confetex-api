import { EntityManager } from '@mikro-orm/mariadb';
import { Injectable } from '@nestjs/common';
import { paginate, Paginated } from 'src/common/paginate/paginate';
import { PaginateQuery } from '../../common/paginate/paginate.decorator';
import { User } from '../users/entities/user.entity';
import { CreateLog } from './dto/create-log.dto';
import { Log } from './entities/log.entity';

@Injectable()
export class LogService {
  constructor(private readonly em: EntityManager) {}

  async findById(id: number): Promise<Log> {
    return this.em.findOneOrFail(Log, { id });
  }

  async findAll(query: PaginateQuery): Promise<Paginated<Log>> {
    return paginate(query, this.em.getRepository(Log), {
      sortableColumns: ['id', 'line', 'mechanic'],
      searchableColumns: ['id', 'line', 'mechanic'],
      defaultSortBy: [['id', 'DESC']],
    });
  }

  async changeMechanic(log: Log, mechanic: User): Promise<Log> {
    log.mechanic = mechanic;
    await this.em.persistAndFlush(log);
    return log;
  }

  async delete(log: Log): Promise<void> {
    await this.em.nativeDelete(Log, log);
  }

  async add(newLog: CreateLog): Promise<Log> {
    const log = this.em.create(Log, {});
    log.mechanic = this.em.getReference(User, newLog.mechanic);

    await this.em.persistAndFlush(log);
    return log;
  }
}
