import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { User } from 'src/types/graphql';
import { AuthenticationError } from 'apollo-server-errors';
import { UsersService } from 'src/users/users.service';

const cookieExtractor = (req: Request) => {
  if (req && req.signedCookies && !('access_token' in req.signedCookies)) {
    throw new AuthenticationError('User not logged in');
  }
  return req.signedCookies['access_token'];
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: cookieExtractor,
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(user: User | null) {
    if (!user) throw new AuthenticationError('Error parsing token');
    const dbUser = await this.usersService.findOne(user.id);
    if (!dbUser) throw new AuthenticationError('User does not exist');
    if (dbUser.username !== user.username || dbUser.email !== user.email) {
      throw new AuthenticationError('Malformed user token');
    }
    return user;
  }
}
