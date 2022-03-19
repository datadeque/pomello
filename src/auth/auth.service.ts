import { Injectable } from '@nestjs/common';
import { CookieOptions } from 'express';
import { User } from 'src/types/graphql';
import { signUser } from 'src/utils/jwt';

@Injectable()
export class AuthService {
  createAccessToken(
    user: User,
  ): [name: string, val: string, options: CookieOptions] {
    const token = signUser(user, process.env.JWT_SECRET);
    return [
      'access_token',
      token,
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
