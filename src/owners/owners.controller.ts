import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OwnersService } from './owners.service';
import { CreateOwnerDto } from './dto/create-owner.dto';

@Controller()
export class OwnersController {
  constructor(private readonly ownersService: OwnersService) {}

  @MessagePattern('createOwner')
  async create(@Payload() createOwnerDto: CreateOwnerDto) {
    return await this.ownersService.create(createOwnerDto);
  }

  @MessagePattern('findOneOwner')
  async findOne(@Payload() id: number) {
    return await this.ownersService.findOne(id);
  }
}
