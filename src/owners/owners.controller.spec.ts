import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from 'src/prisma/prisma.module';
import { OwnersController } from './owners.controller';
import { OwnersService } from './owners.service';

describe('OwnersController', () => {
  let controller: OwnersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OwnersController],
      providers: [OwnersService],
      imports: [PrismaModule],
    }).compile();

    controller = module.get<OwnersController>(OwnersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
