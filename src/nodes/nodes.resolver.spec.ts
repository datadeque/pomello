import { forwardRef } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProjectsModule } from 'src/projects/projects.module';
import { NodesResolver } from './nodes.resolver';
import { NodesService } from './nodes.service';

describe('NodesResolver', () => {
  let resolver: NodesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NodesResolver, NodesService],
      imports: [forwardRef(() => ProjectsModule), PrismaModule],
    }).compile();

    resolver = module.get<NodesResolver>(NodesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
