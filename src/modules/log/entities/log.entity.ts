import {
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Line } from '../../lines/entities/line.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Log {
  @PrimaryKey()
  id: number;

  @ManyToOne()
  line: Line;

  @OneToOne()
  mechanic: User;

  @Property({ persist: false })
  name() {
    return `Bitacora ${this.id}`;
  }
}
