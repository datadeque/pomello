import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { AuthenticationError } from 'apollo-server-errors';
import { UsersService } from 'src/users/users.service';
import { TokensService } from 'src/tokens/tokens.service';

export interface AccessToken {
  tokenId: string;
}

const cookieExtractor = (req: Request) => {
  if (req && req.signedCookies && !('access_token' in req.signedCookies)) {
    throw new AuthenticationError('User not logged in');
  }
  return req.signedCookies['access_token'];
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokensService: TokensService,
  ) {
    super({
      jwtFromRequest: cookieExtractor,
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(token: AccessToken | null) {
    if (!token) throw new AuthenticationError('Error parsing token');
    const dbToken = await this.tokensService.findById(token.tokenId);
    if (!dbToken) throw new AuthenticationError('Error fetching token');

    const dbUser = await this.usersService.findOne(dbToken.userId);
    if (!dbUser) throw new AuthenticationError('User does not exist');
    return dbUser;
  }
}
