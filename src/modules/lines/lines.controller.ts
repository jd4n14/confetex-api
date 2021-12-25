import { Controller, Delete, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { Line } from './entities/line.entity';
import { LinesService } from './lines.service';

@Controller('lines')
export class LinesController {
  constructor(private readonly lineService: LinesService) {}

  @Get()
  async findAll(): Promise<Line[]> {
    return this.lineService.getAll();
  }

  @Post()
  async create(): Promise<Line> {
    return this.lineService.create();
  }

  @Delete('/:line')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param() lineId: number): Promise<void> {
    const line = await this.lineService.findOne(lineId);
    await this.lineService.delete(line);
  }
}
