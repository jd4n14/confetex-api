import { Entity, ManyToOne, OneToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { User } from '@modules/users/entities/user.entity';
import { Log } from '@modules/log/entities/log.entity';
import { Machine } from '@modules/machine/entities/machine.entity';

@Entity()
export class Request {
  @PrimaryKey()
  id: number;

  @Property()
  problem: string;

  @Property()
  priority: number;

  @Property()
  details: string;

  @Property()
  module: string;

  @ManyToOne()
  machine: Machine;

  @ManyToOne()
  log: Log;

  @OneToOne()
  supervisor: User;

  @Property({ type: Date, nullable: true, defaultRaw: 'now()' })
  createdAt: Date;
}
