import * as jwt from 'jsonwebtoken';
import { User } from 'src/types/graphql';

export const signUser = ({ id, username, email }: User) => {
  return jwt.sign({ id, username, email }, process.env.JWT_SECRET);
};
