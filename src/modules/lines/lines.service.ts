import { EntityRepository } from '@mikro-orm/postgresql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { Line } from './entities/line.entity';

@Injectable()
export class LinesService {
  constructor(
    @InjectRepository(Line)
    private readonly lineRepository: EntityRepository<Line>,
  ) {}

  async findOne(id: number): Promise<Line> {
    return this.lineRepository.findOneOrFail({ id });
  }

  async getAll(): Promise<Line[]> {
    return this.lineRepository.find({});
  }

  async create(): Promise<Line> {
    const line = this.lineRepository.create({});
    await this.lineRepository.persistAndFlush(line);
    return line;
  }

  async delete(line: Line): Promise<void> {
    await this.lineRepository.nativeDelete(line);
  }
}
