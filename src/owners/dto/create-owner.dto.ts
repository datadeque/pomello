import { OwnerType } from '@prisma/client';

export class CreateOwnerDto {
  name: string;
  type: OwnerType;
}
