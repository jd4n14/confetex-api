import { Entity, OneToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { User } from '@modules/users/entities/user.entity';
import { Request } from '@modules/request/entities/request.entity';

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
