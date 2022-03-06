import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOwnerDto } from './dto/create-owner.dto';

@Injectable()
export class OwnersService {
  constructor(private prisma: PrismaService) {}

  async create({ name, type }: CreateOwnerDto) {
    return await this.prisma.ownerEntity.create({
      data: {
        name,
        type,
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.ownerEntity.findUnique({
      where: {
        id,
      },
    });
  }
}
