import { EntityManager } from '@mikro-orm/mariadb';
import { Injectable } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { CreateLog } from './dto/create-log.dto';
import { Log } from './entities/log.entity';

@Injectable()
export class LogService {
  constructor(private readonly em: EntityManager) {}

  async findById(id: number): Promise<Log> {
    return this.em.findOneOrFail(Log, { id });
  }

  async findAll(): Promise<Log[]> {
    return this.em.find(Log, {}, { populate: ['mechanic', 'line'] });
  }

  async changeMechanic(log: Log, mechanic: number): Promise<Log> {
    log.mechanic = this.em.getReference(User, mechanic);
    await this.em.persistAndFlush(log);
    return log;
  }

  async delete(log: Log): Promise<void> {
    await this.em.nativeDelete(Log, log);
  }

  async create(newLog: CreateLog): Promise<Log> {
    const log = this.em.create(Log, {} as any);
    log.mechanic = this.em.getReference(User, newLog.mechanic);

    await this.em.persistAndFlush(log);
    return log;
  }
}
