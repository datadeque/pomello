import { Test, TestingModule } from '@nestjs/testing';
import { OwnersModule } from 'src/owners/owners.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
      imports: [OwnersModule, PrismaModule],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
