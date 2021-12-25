import { EntityManager } from '@mikro-orm/mariadb';
import { Injectable } from '@nestjs/common';
import { Line } from './entities/line.entity';

@Injectable()
export class LinesService {
  constructor(private readonly em: EntityManager) {}

  async findOne(id: number): Promise<Line> {
    return this.em.findOneOrFail(Line, { id });
  }

  async getAll(): Promise<Line[]> {
    return this.em.find(Line, {});
  }

  async create(): Promise<Line> {
    const line = this.em.create(Line, {});
    this.em.persistAndFlush(line);
    return line;
  }

  async delete(line: Line): Promise<void> {
    await this.em.nativeDelete(Line, line);
  }
}
