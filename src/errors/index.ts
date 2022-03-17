import { ApolloError } from 'apollo-server-errors';

export class CreateUserError extends ApolloError {
  constructor(message: string) {
    super(message, 'CREATE_USER_ERROR');
    Object.defineProperty(this, 'name', { value: 'CreateUserError' });
  }
}

export class AuthenticationError extends ApolloError {
  constructor(message: string) {
    super(message, 'AUTHENTICATION_ERROR');
    Object.defineProperty(this, 'name', { value: 'AuthenticationError' });
  }
}

export class NotFoundError extends ApolloError {
  constructor(message: string) {
    super(message, 'NOT_FOUND');
    Object.defineProperty(this, 'name', { value: 'NotFound' });
  }
}
