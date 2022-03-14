import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { OwnersModule } from 'src/owners/owners.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [UsersResolver, UsersService],
  imports: [OwnersModule, AuthModule],
  exports: [UsersService],
})
export class UsersModule {}
