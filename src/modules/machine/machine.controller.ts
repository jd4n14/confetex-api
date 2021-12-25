import { Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiPaginatedResponse } from '../../common/paginate/api-paginated';
import { Paginated } from '../../common/paginate/paginate';
import { Paginate, PaginateQuery } from '../../common/paginate/paginate.decorator';
import { Machine } from './entities/machine.entity';
import { MachineService } from './machine.service';
import { CreateMachine, UpdateMachine } from './dto/create-machine.dto';

@Controller('machines')
@ApiTags('Machine')
export class MachineController {
  constructor(private readonly machineService: MachineService) {}

  @Get()
  @ApiPaginatedResponse(Machine)
  async getAll(@Paginate() query: PaginateQuery): Promise<Paginated<Machine>> {
    return this.machineService.findAll(query);
  }

  @Post()
  async create(machine: CreateMachine): Promise<Machine> {
    return this.machineService.create(machine);
  }

  @Put('/:machine')
  async update(@Param('machine') id: number, updateMachine: UpdateMachine): Promise<UpdateMachine> {
    const machine = await this.machineService.findOneById(id);
    return this.machineService.update(machine, updateMachine);
  }

  @Delete('/:machine')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('machine') id: number): Promise<void> {
    const machine = await this.machineService.findOneById(id);
    return this.machineService.delete(machine);
  }
}
