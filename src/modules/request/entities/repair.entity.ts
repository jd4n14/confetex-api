import { Entity, OneToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { User } from '../../users/entities/user.entity';
import { Request } from '../../request/entities/request.entity';

@Entity()
export class Repair {
  @PrimaryKey()
  id: number;

  @Property()
  type: string;

  @OneToOne()
  mechanic: User;

  @OneToOne()
  request: Request;

  @Property({ type: Date, nullable: true })
  arrivedAt: Date;

  @Property({ type: Date, nullable: true })
  readyAt: Date;
}
