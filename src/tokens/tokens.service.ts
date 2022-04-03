import { Injectable } from '@nestjs/common';
import { Token } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTokenDto } from './dto/create-token.dto';

@Injectable()
export class TokensService {
  constructor(private readonly prisma: PrismaService) {}
  create(createTokenDto: CreateTokenDto) {
    return this.prisma.token.create({ data: createTokenDto });
  }

  async findById(id: string) {
    return await this.validateToken(
      await this.prisma.token.findUnique({
        where: { id },
        rejectOnNotFound: false,
      }),
    );
  }

  async findByUser(userId: number) {
    return await this.validateToken(
      await this.prisma.token.findUnique({
        where: { userId },
        rejectOnNotFound: false,
      }),
    );
  }

  remove(id: string) {
    return this.prisma.token.delete({
      where: {
        id,
      },
    });
  }

  async validateToken(token: Token) {
    if (!token || token.expiresAt.getTime() < Date.now()) return token;
    await this.remove(token.id);
    return null;
  }
}
