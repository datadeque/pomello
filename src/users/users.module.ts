import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { OwnersModule } from 'src/owners/owners.module';
import { AuthModule } from 'src/auth/auth.module';
import { TokensModule } from 'src/tokens/tokens.module';

@Module({
  providers: [UsersResolver, UsersService],
  imports: [OwnersModule, forwardRef(() => AuthModule), TokensModule],
  exports: [UsersService],
})
export class UsersModule {}
