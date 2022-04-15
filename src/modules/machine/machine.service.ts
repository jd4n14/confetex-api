import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { paginate, Paginated } from '@common/paginate';
import { PaginateQuery } from '@common/paginate';
import { Machine } from './entities/machine.entity';
import { CreateMachine, UpdateMachine } from './dto/create-machine.dto';
import { wrap } from '@mikro-orm/core';

@Injectable()
export class MachineService {
  constructor(private readonly em: EntityManager) {}

  async findAll(query: PaginateQuery): Promise<Paginated<Machine>> {
    return paginate(query, this.em.getRepository(Machine), {
      sortableColumns: ['identifier', 'model', 'operator'],
      searchableColumns: ['id', 'identifier', 'model', 'operator'],
      defaultSortBy: [['identifier', 'DESC']],
    });
  }

  async create(newMachine: CreateMachine): Promise<Machine> {
    const machine = this.em.create(Machine, newMachine);
    await this.em.persistAndFlush(machine);
    return machine;
  }

  async update(machine: Machine, newMachine: UpdateMachine): Promise<Machine> {
    wrap(machine).assign(newMachine);
    await this.em.persistAndFlush(machine);
    return machine;
  }

  async delete(machine: Machine): Promise<void> {
    await this.em.nativeDelete(Machine, machine);
  }

  async findOneById(id: number): Promise<Machine> {
    return this.em.findOneOrFail(Machine, { id });
  }
}
