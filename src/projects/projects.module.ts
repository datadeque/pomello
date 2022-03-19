import { forwardRef, Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsResolver } from './projects.resolver';
import { NodesModule } from 'src/nodes/nodes.module';

@Module({
  providers: [ProjectsResolver, ProjectsService],
  imports: [forwardRef(() => NodesModule)],
  exports: [ProjectsService],
})
export class ProjectsModule {}
