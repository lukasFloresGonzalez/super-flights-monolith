import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PassengersDto } from './dto/passengers.dto';
import { PassengersService } from './passengers.service';

@Controller('api/v1/passengers')
export class PassengersController {
  constructor(private readonly passengersService: PassengersService) {}
  @Post()
  create(@Body() passengerDto: PassengersDto) {
    return this.passengersService.create(passengerDto);
  }

  @Get()
  findAll() {
    return this.passengersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.passengersService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() passengerDto: PassengersDto) {
    return this.passengersService.update(id, passengerDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.passengersService.delete(id);
  }
}
