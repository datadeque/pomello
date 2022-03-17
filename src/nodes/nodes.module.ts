import { forwardRef, Module } from '@nestjs/common';
import { NodesService } from './nodes.service';
import { NodesResolver } from './nodes.resolver';
import { ProjectsModule } from 'src/projects/projects.module';

@Module({
  providers: [NodesResolver, NodesService],
  imports: [forwardRef(() => ProjectsModule)],
  exports: [NodesService],
})
export class NodesModule {}
