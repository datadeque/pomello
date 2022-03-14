
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class CreateUserInput {
    username: string;
    email: string;
    password: string;
}

export class LoginUserInput {
    username?: Nullable<string>;
    email?: Nullable<string>;
    password: string;
}

export class User {
    id: number;
    username: string;
    email: string;
}

export class AuthenticationOutput {
    user: User;
}

export abstract class IQuery {
    abstract profile(): User | Promise<User>;
}

export abstract class IMutation {
    abstract createUser(createUserInput: CreateUserInput): AuthenticationOutput | Promise<AuthenticationOutput>;

    abstract loginUser(loginUserInput: LoginUserInput): AuthenticationOutput | Promise<AuthenticationOutput>;
}

type Nullable<T> = T | null;
