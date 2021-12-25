import { Module } from '@nestjs/common';
import { LinesService } from './lines.service';
import { LinesController } from './lines.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Line } from './entities/line.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Line])],
  providers: [LinesService],
  controllers: [LinesController],
})
export class LinesModule {}
