import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { FlightsService } from './flights.service';
import { FlightsDto } from './dto/flights.dto';

@Controller('api/v1/flights')
export class FlightsController {
  constructor(private readonly flightsService: FlightsService) {}

  @Post()
  async create(@Body() flightsDto: FlightsDto) {
    return this.flightsService.create(flightsDto);
  }

  @Get()
  async findAll() {
    return this.flightsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.flightsService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() flightsDto: FlightsDto) {
    return this.flightsService.update(id, flightsDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.flightsService.delete(id);
  }
}
