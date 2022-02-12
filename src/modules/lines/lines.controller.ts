import { Controller, Delete, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Line } from './entities/line.entity';
import { LinesService } from './lines.service';

@Controller('lines')
@ApiTags('Lines')
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
  async delete(@Param('line') id: number): Promise<void> {
    const line = await this.lineService.findOne(id);
    await this.lineService.delete(line);
  }
}
