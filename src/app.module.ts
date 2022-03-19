import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { GraphQLModule } from '@nestjs/graphql';
import { OwnersModule } from './owners/owners.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { NodesModule } from './nodes/nodes.module';
import { ProjectsModule } from './projects/projects.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      typePaths: ['./**/*.graphql'],
      cors: {
        origin:
          process.env.NODE_ENV === 'production'
            ? ['https://datadeque.com', 'https://www.datadeque.com']
            : ['http://localhost:3000', 'https://studio.apollographql.com'],
        credentials: true,
      },
      context: ({ req }) => ({ req }),
    }),
    OwnersModule,
    UsersModule,
    PrismaModule,
    NodesModule,
    ProjectsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
