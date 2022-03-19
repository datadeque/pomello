import { forwardRef } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProjectsModule } from 'src/projects/projects.module';
import { NodesService } from './nodes.service';

describe('NodesService', () => {
  let service: NodesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NodesService],
      imports: [forwardRef(() => ProjectsModule), PrismaModule],
    }).compile();

    service = module.get<NodesService>(NodesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
