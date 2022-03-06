import { Test, TestingModule } from '@nestjs/testing';
import { OwnersService } from 'src/owners/owners.service';
import { PrismaModule } from 'src/prisma/prisma.module';

describe('OwnersService', () => {
  let service: OwnersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OwnersService],
      imports: [PrismaModule],
    }).compile();

    service = module.get<OwnersService>(OwnersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
