import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProjectsService } from './projects.service';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { NodeType, Project, User } from 'src/types/graphql';
import { CurrentUser } from 'src/users/decorators/users.decorator';
import { NodesService } from 'src/nodes/nodes.service';
import { ForbiddenError, UserInputError } from 'apollo-server-errors';

@Resolver('Project')
export class ProjectsResolver {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly nodesService: NodesService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Mutation('createProject')
  async create(
    @Args('createProjectInput') createProjectInput: CreateProjectInput,
    @CurrentUser() user: User,
  ) {
    const project = await this.projectsService.create(createProjectInput, user);
    const node = await this.nodesService.create(
      {
        projectId: project.id,
        data: JSON.stringify({ title: 'Graph', description: 'Lorem Ipsum' }),
        type: createProjectInput.initialNodeType ?? NodeType.BAR,
      },
      user,
    );
    return { ...project, nodes: [node] };
  }

  @UseGuards(JwtAuthGuard)
  @Query('project')
  async findOne(@Args('name') name: string, @CurrentUser() user: User) {
    return await this.projectsService.findByAuthorAndName(
      user.username,
      name,
      false,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Query('projects')
  async findAll(@CurrentUser() user: User): Promise<Project[]> {
    return await this.projectsService.findAll(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation('updateProject')
  update(
    @Args('updateProjectInput') updateProjectInput: UpdateProjectInput,
    @CurrentUser() user: User,
  ) {
    if (updateProjectInput.name && updateProjectInput.description) {
      throw new UserInputError('Cannot updat name and input at the same time');
    }
    return this.projectsService.update(
      updateProjectInput.id,
      updateProjectInput,
      user,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Mutation('removeProject')
  remove(@Args('id') id: number, @CurrentUser() user: User) {
    return this.projectsService.remove(id, user);
  }
}