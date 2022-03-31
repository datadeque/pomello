import { Injectable } from '@nestjs/common';
import { ForbiddenError, UserInputError } from 'apollo-server-errors';
import { NotFoundError } from 'src/errors';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateProjectInput, User } from 'src/types/graphql';
import { CreateProjectInput } from './dto/create-project.input';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}
  async create(
    { name, description, public: isPublic }: CreateProjectInput,
    user: User,
  ) {
    const projectWithName = await this.prisma.project.findUnique({
      where: {
        Project_ownerEntityId_name_key: {
          ownerEntityId: user.id,
          name,
        },
      },
      rejectOnNotFound: false,
    });

    if (projectWithName)
      throw new UserInputError(`Project with name: ${name} already exists`);

    const project = this.prisma.project.create({
      data: {
        name,
        description,
        ownerName: user.username,
        ownerEntityId: user.id,
        public: isPublic ?? false,
      },
    });
    return project;
  }

  findAll(ownerEntityId: number) {
    return this.prisma.project.findMany({ where: { ownerEntityId } });
  }

  async findByAuthorAndName(author: string, name: string, publicOnly = true) {
    const project = await this.prisma.project.findUnique({
      where: {
        Project_ownerName_name_key: {
          ownerName: author,
          name,
        },
      },
      include: {
        nodes: {
          orderBy: {
            position: 'asc',
          },
        },
      },
      rejectOnNotFound: false,
    });
    if (!project || (publicOnly && !project.public))
      throw new NotFoundError('Project not found');
    return project;
  }

  async findOne(id: number) {
    const project = await this.prisma.project.findUnique({
      where: {
        id,
      },
      include: {
        nodes: {
          orderBy: {
            position: 'asc',
          },
        },
      },
      rejectOnNotFound: false,
    });

    if (!project) throw new NotFoundError('Project not found');

    return project;
  }

  async findOwnProject(id: number, user: User) {
    const project = await this.findOne(id);
    if (project.ownerEntityId === user.id) {
      return project;
    }
    throw new ForbiddenError('Cannot edit project');
  }

  async update(id: number, updateProjectInput: UpdateProjectInput, user: User) {
    const project = await this.prisma.project.findUnique({
      where: {
        id,
      },
      include: {
        nodes: {
          orderBy: {
            position: 'asc',
          },
        },
      },
      rejectOnNotFound: false,
    });
    if (!project) throw new NotFoundError('Project not found');
    if (project.ownerEntityId !== user.id) {
      throw new ForbiddenError('Cannot edit project');
    }
    if (updateProjectInput.public !== undefined) {
      return await this.prisma.project.update({
        where: {
          id,
        },
        data: {
          public: updateProjectInput.public,
        },
      });
    }
    if (updateProjectInput.name) {
      const projectWithName = await this.prisma.project.findUnique({
        where: {
          Project_ownerName_name_key: {
            ownerName: user.username,
            name: updateProjectInput.name,
          },
        },
        include: {
          nodes: {
            orderBy: {
              position: 'asc',
            },
          },
        },
        rejectOnNotFound: false,
      });

      if (projectWithName)
        throw new UserInputError('Project with name already exists');
      return await this.prisma.project.update({
        where: {
          id,
        },
        data: {
          name: updateProjectInput.name,
        },
      });
    }

    return await this.prisma.project.update({
      where: {
        id,
      },
      data: {
        description: updateProjectInput.description,
      },
    });
  }

  async remove(id: number, user: User) {
    const project = await this.prisma.project.findUnique({
      where: {
        id,
      },
      rejectOnNotFound: false,
    });

    if (!project) throw new NotFoundError('Project not found');
    if (project.ownerEntityId !== user.id) {
      throw new ForbiddenError('Cannot delete project');
    }

    return await this.prisma.project.delete({
      where: { id },
      include: {
        nodes: {
          orderBy: {
            position: 'asc',
          },
        },
      },
    });
  }
}
