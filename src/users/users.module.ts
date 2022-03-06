import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { OwnersModule } from 'src/owners/owners.module';

@Module({
  providers: [UsersResolver, UsersService],
  imports: [OwnersModule],
})
export class UsersModule {}
