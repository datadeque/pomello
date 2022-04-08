import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/create-user.input';
import { LoginUserInput, User } from 'src/types/graphql';
import { UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from './decorators/users.decorator';
import { TokensService } from 'src/tokens/tokens.service';

@Resolver('User')
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
    private readonly tokensService: TokensService,
  ) {}

  @Mutation('createUser')
  async create(
    @Args('createUserInput') createUserInput: CreateUserInput,
    @Context('req') req: Request,
  ) {
    const user = await this.usersService.create(createUserInput);
    const cookie = await this.authService.createAccessToken(user);
    req.res.cookie(...cookie);

    return { user };
  }

  @Mutation('loginUser')
  async login(
    @Args('loginUserInput') loginUserInput: LoginUserInput,
    @Context('req') req: Request,
  ) {
    const user = await this.usersService.login(loginUserInput);
    const cookie = await this.authService.createAccessToken(user);
    req.res.cookie(...cookie);

    return { user };
  }

  @UseGuards(JwtAuthGuard)
  @Mutation('logoutUser')
  async logout(@Context('req') req: Request, @CurrentUser() user: User) {
    try {
      req.res.clearCookie('access_token', {
        httpOnly: true,
        path: '/',
        signed: true,
        sameSite: 'none',
        secure: true,
      });
      await this.tokensService.removeByUserId(user.id);
      return { success: true };
    } catch (err) {
      console.error(err);
      return { success: false };
    }
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => User, { name: 'profile', nullable: false })
  async profile(@CurrentUser() user: User) {
    return user;
  }
}
