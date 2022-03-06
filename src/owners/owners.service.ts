import { Injectable } from '@nestjs/common';
import { CreateOwnerDto } from './dto/create-owner.dto';

import { prisma } from 'src/repository';

@Injectable()
export class OwnersService {
  async create({ name, type }: CreateOwnerDto) {
    return await prisma.ownerEntity.create({
      data: {
        name,
        type,
      },
    });
  }

  async findOne(id: number) {
    return await prisma.ownerEntity.findUnique({
      where: {
        id,
      },
    });
  }
}
