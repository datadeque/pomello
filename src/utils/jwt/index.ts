import * as jwt from 'jsonwebtoken';
import { User } from 'src/types/graphql';

export const signUser = ({ id, username, email }: User, secret: string) => {
  return jwt.sign({ id, username, email }, secret);
};
