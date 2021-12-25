import { PartialType } from '@nestjs/swagger';

export class CreateMachine {
  identifier: string;
  brand: string;
  model: string;
  operator: string;
}

export class UpdateMachine extends PartialType(CreateMachine) {}
