import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { LogService } from './log.service';
import { Log } from './entities/log.entity';
import { CreateLog } from './dto/create-log.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('logs')
@ApiTags('Logs')
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Get()
  async getAll(): Promise<Log[]> {
    return this.logService.findAll();
  }

  @Post()
  async create(@Body() log: CreateLog): Promise<Log> {
    return this.logService.create(log);
  }

  @Delete('/:log')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('log') logId: number): Promise<void> {
    const log = await this.logService.findById(logId);
    await this.logService.delete(log);
  }

  @Put('/:log/mechanic/:mechanic')
  async mechanic(@Param('log') logId: number, @Param('mechanic') mechanicId: number): Promise<Log> {
    const log = await this.logService.findById(logId);
    return this.logService.changeMechanic(log, mechanicId);
  }
}
