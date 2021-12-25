import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Problem {
  @PrimaryKey()
  id: number;

  @Property()
  name: string;
}
