import { Token } from '@prisma/client';
import * as jwt from 'jsonwebtoken';

export const signToken = ({ id }: Token, secret: string) => {
  return jwt.sign({ tokenId: id }, secret);
};
