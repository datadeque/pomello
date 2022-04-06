import { Injectable } from '@nestjs/common';
import { CookieOptions } from 'express';
import { TokensService } from 'src/tokens/tokens.service';
import { User } from 'src/types/graphql';
import { signToken } from 'src/utils/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly tokensService: TokensService) {}
  async createAccessToken(
    user: User,
  ): Promise<[name: string, val: string, options: CookieOptions]> {
    const token =
      (await this.tokensService.findByUser(user.id)) ??
      (await this.tokensService.create({
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
        userId: user.id,
      }));

    const clientToken = signToken(token, process.env.JWT_SECRET);
    return [
      'access_token',
      clientToken,
      {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
        path: '/',
        signed: true,
        sameSite: 'none',
        secure: true,
      },
    ];
  }
}
