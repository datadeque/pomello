import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/create-user.input';
import { signUser } from 'src/utils/jwt';
import { AuthenticationOutput, LoginUserInput } from 'src/types/graphql';

@Resolver('User')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation('createUser')
  async create(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<AuthenticationOutput> {
    const user = await this.usersService.create(createUserInput);
    const token = signUser(user);
    return {
      user,
      token,
    };
  }

  @Mutation('loginUser')
  async login(
    @Args('loginUserInput') loginUserInput: LoginUserInput,
  ): Promise<AuthenticationOutput> {
    const user = await this.usersService.login(loginUserInput);
    const token = signUser(user);
    return {
      user,
      token,
    };
  }
}
