import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Machine {
  @PrimaryKey()
  id: number;
  
  @Property({ index: true })
  identifier: string;
  
  @Property()
  brand: string;
  
  @Property()
  model: string;
  
  @Property()
  operator: string;
}
