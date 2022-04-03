import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TokensService } from './tokens.service';

@Module({
  imports: [PrismaService],
  providers: [TokensService],
  exports: [TokensService],
})
export class TokensModule {}
