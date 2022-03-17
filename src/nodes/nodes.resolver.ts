import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateNodeInput, UpdateNodeInput, User } from 'src/types/graphql';
import { CurrentUser } from 'src/users/decorators/users.decorator';
import { NodesService } from './nodes.service';

@Resolver('Node')
export class NodesResolver {
  constructor(private readonly nodesService: NodesService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation('createNode')
  create(
    @Args('createNodeInput') createNodeInput: CreateNodeInput,
    @CurrentUser() user: User,
  ) {
    return this.nodesService.create(createNodeInput, user);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation('updateNode')
  update(
    @Args('updateNodeInput') updateNodeInput: UpdateNodeInput,
    @CurrentUser() user: User,
  ) {
    return this.nodesService.update(updateNodeInput, user);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation('removeNode')
  remove(@Args('id') id: string, @CurrentUser() user: User) {
    return this.nodesService.remove(id, user);
  }
}
