import { Injectable } from '@nestjs/common';
import { prisma } from 'src/repository';
import { CreateUserInput } from './dto/create-user.input';
import * as bcrypt from 'bcrypt';
import { OwnersService } from 'src/owners/owners.service';
import { OwnerType, User } from '@prisma/client';
import { AuthenticationError, CreateUserError } from 'src/errors';
import { LoginUserInput } from 'src/types/graphql';

@Injectable()
export class UsersService {
  constructor(private ownerService: OwnersService) {}
  async create({ username, email, password }: CreateUserInput) {
    const userWithEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    const userWithUsername = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    if (userWithEmail || userWithUsername)
      throw new CreateUserError(
        `User with ${userWithEmail ? 'email' : 'username'} already exists`,
      );
    const owner = await this.ownerService.create({
      name: username,
      type: OwnerType.USER,
    });
    const hash = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: {
        id: owner.id,
        username,
        email,
        password: hash,
      },
    });
    return user;
  }

  async login({ username, email, password }: LoginUserInput) {
    if (!username && !email)
      throw new AuthenticationError('One of email, username must be provided');

    let user: User;
    if (username) {
      user = await prisma.user.findUnique({ where: { username } });
    } else if (email) {
      user = await prisma.user.findUnique({ where: { email } });
    }
    if (!user)
      throw new AuthenticationError(
        `User with ${username ? 'username' : 'email'} not found`,
      );
    if (!(await bcrypt.compare(password, user.password))) {
      throw new AuthenticationError('Credentials incorrect');
    }
    return user;
  }

  async findOne(id: number) {
    return await prisma.user.findUnique({
      where: {
        id,
      },
    });
  }
}
