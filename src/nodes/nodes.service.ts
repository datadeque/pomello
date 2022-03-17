import { Injectable } from '@nestjs/common';
import { ForbiddenError, UserInputError } from 'apollo-server-errors';
import { NotFoundError } from 'src/errors';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProjectsService } from 'src/projects/projects.service';
import { CreateNodeInput, UpdateNodeInput, User } from 'src/types/graphql';

@Injectable()
export class NodesService {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly prisma: PrismaService,
  ) {}
  async create(
    { projectId, before, after, data, type }: CreateNodeInput,
    user: User,
  ) {
    const project = await this.projectsService.findOwnProject(projectId, user);

    const nodes = await this.prisma.node.findMany({
      where: {
        projectId,
      },
      orderBy: {
        position: 'asc',
      },
    });
    let position: number;
    if (before || after) throw new UserInputError('Currently unsupported');
    if (!before && !after) {
      if (nodes.length) {
        position = parseInt(nodes[nodes.length - 1].position) + 1;
      } else {
        position = 0;
      }
    }
    const node = await this.prisma.node.create({
      data: {
        position: position.toString(),
        data,
        type,
        projectId: project.id,
      },
    });

    return node;
  }

  async update(updateNodeInput: UpdateNodeInput, user: User) {
    const node = await this.prisma.node.findUnique({
      where: { id: updateNodeInput.nodeId },
      rejectOnNotFound: false,
    });
    if (!node) throw new NotFoundError('Node not found');
    const project = await this.prisma.project.findUnique({
      where: {
        id: node.projectId,
      },
      rejectOnNotFound: false,
    });
    if (!project) throw new NotFoundError('Project not found');
    if (project.ownerEntityId !== user.id)
      throw new ForbiddenError('Cannot edit project');

    return await this.prisma.node.update({
      where: {
        id: updateNodeInput.nodeId,
      },
      data: {
        data: updateNodeInput.data,
      },
    });
  }

  async remove(id: string, user: User) {
    const node = await this.prisma.node.findUnique({
      where: {
        id,
      },
      rejectOnNotFound: false,
    });
    if (!node) throw new NotFoundError('Node not found');
    const project = await this.prisma.project.findUnique({
      where: {
        id: node.projectId,
      },
      rejectOnNotFound: false,
    });
    if (!project) throw new NotFoundError('Project not found');
    if (project.ownerEntityId !== user.id)
      throw new ForbiddenError('Cannot edit project');
    else
      return await this.prisma.node.delete({
        where: {
          id,
        },
      });
  }
}
