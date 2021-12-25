import {
  BeforeCreate,
  Entity,
  Enum,
  ManyToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { ProductionLine } from '../../lines/entities/line.entity';

export enum Role {
  ADMIN = 'ADMIN',
  SUPERVISOR = 'SUPERVISOR',
  MECHANIC = 'MECHANIC',
}

@Entity()
export class User {
  @PrimaryKey()
  id: number;

  @Property()
  name: string;

  @Property()
  email: string;

  @Property()
  @Exclude()
  password: string;

  @BeforeCreate()
  async hashPassword(): Promise<void> {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  @Enum()
  role: Role;

  @ManyToOne()
  productionLine: ProductionLine;
}
