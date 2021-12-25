import { Entity, PrimaryKey } from '@mikro-orm/core';

@Entity({ tableName: 'production_line' })
export class ProductionLine {
  @PrimaryKey()
  id: number;
}
