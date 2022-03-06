import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

const definitionsFactory = new GraphQLDefinitionsFactory();
definitionsFactory.generate({
  typePaths: [join(process.cwd(), 'src/**/*.graphql')],
  path: join(process.cwd(), 'src/types/graphql.ts'),
  outputAs: 'class',
  watch: true,
});
