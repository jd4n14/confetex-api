import { Entity, PrimaryKey } from '@mikro-orm/core';

@Entity()
export class Line {
  @PrimaryKey()
  id: number;
}
