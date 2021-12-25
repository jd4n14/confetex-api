import { Entity, ManyToOne, OneToOne, PrimaryKey } from '@mikro-orm/core';
import { User } from '../../users/entities/user.entity';
import { ProductionLine } from '../../lines/entities/line.entity';

@Entity()
export class Log {
  @PrimaryKey()
  id: number;

  @ManyToOne()
  line: ProductionLine;

  @OneToOne()
  mechanic: User;
}
