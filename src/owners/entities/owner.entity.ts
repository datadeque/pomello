import { OwnerType } from '@prisma/client';

export class Owner {
  id: number;
  name: string;
  type: OwnerType;
}
