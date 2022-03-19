
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum NodeType {
    BAR = "BAR",
    PIE = "PIE",
    TEXT = "TEXT"
}

export class CreateNodeInput {
    before?: Nullable<string>;
    after?: Nullable<string>;
    data: string;
    projectId: number;
    type: NodeType;
}

export class UpdateNodeInput {
    nodeId: string;
    data: string;
}

export class CreateProjectInput {
    name: string;
    description: string;
    public: boolean;
    initialNodeType: NodeType;
}

export class UpdateProjectInput {
    id: number;
    name?: Nullable<string>;
    description?: Nullable<string>;
}

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

export class Node {
    id: string;
    position: string;
    data: string;
    type: NodeType;
}

export abstract class IMutation {
    abstract createNode(createNodeInput: CreateNodeInput): Node | Promise<Node>;

    abstract updateNode(updateNodeInput: UpdateNodeInput): Node | Promise<Node>;

    abstract removeNode(id: string): Node | Promise<Node>;

    abstract createProject(createProjectInput: CreateProjectInput): Project | Promise<Project>;

    abstract updateProject(updateProjectInput: UpdateProjectInput): Project | Promise<Project>;

    abstract removeProject(id: number): Nullable<Project> | Promise<Nullable<Project>>;

    abstract createUser(createUserInput: CreateUserInput): AuthenticationOutput | Promise<AuthenticationOutput>;

    abstract loginUser(loginUserInput: LoginUserInput): AuthenticationOutput | Promise<AuthenticationOutput>;
}

export class Project {
    id: number;
    name: string;
    description: string;
    ownerName: string;
    public: boolean;
    nodes?: Nullable<Node[]>;
}

export abstract class IQuery {
    abstract publicProject(author: string, name: string): Project | Promise<Project>;

    abstract project(name: string): Project | Promise<Project>;

    abstract projects(): Project[] | Promise<Project[]>;

    abstract profile(): User | Promise<User>;
}

export class User {
    id: number;
    username: string;
    email: string;
}

export class AuthenticationOutput {
    user: User;
}

type Nullable<T> = T | null;
