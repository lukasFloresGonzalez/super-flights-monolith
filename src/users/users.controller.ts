import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersDto } from './dto/users.dto';
import { UsersService } from './users.service';
import { IUsers } from '../common/interface/users.interface';

@Controller('api/v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  create(@Body() userDto: UsersDto) {
    return this.usersService.create(userDto);
  }

  @Get()
  findAll(): Promise<IUsers[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() userDto: UsersDto) {
    return this.usersService.update(id, userDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
