import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/create-user.input';
import { LoginUserInput, User } from 'src/types/graphql';
import { UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from './decorators/users.decorator';

@Resolver('User')
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Mutation('createUser')
  async create(
    @Args('createUserInput') createUserInput: CreateUserInput,
    @Context('req') req: Request,
  ) {
    const user = await this.usersService.create(createUserInput);
    const cookie = this.authService.createAccessToken(user);
    req.res.cookie(...cookie);

    return { user };
  }

  @Mutation('loginUser')
  async login(
    @Args('loginUserInput') loginUserInput: LoginUserInput,
    @Context('req') req: Request,
  ) {
    const user = await this.usersService.login(loginUserInput);
    const cookie = this.authService.createAccessToken(user);
    req.res.cookie(...cookie);

    return { user };
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => User, { name: 'profile', nullable: false })
  async profile(@CurrentUser() user: User) {
    return user;
  }
}
