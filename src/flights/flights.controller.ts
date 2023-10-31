import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { FlightsService } from './flights.service';
import { FlightsDto } from './dto/flights.dto';
import { PassengersService } from '../passengers/passengers.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('flights')
@Controller('api/v1/flights')
export class FlightsController {
  constructor(
    private readonly flightsService: FlightsService,
    private readonly passengersService: PassengersService,
  ) {}

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

  @Post(':flightId/passenger/:passengerId')
  async addPassenger(
    @Param('flightId') flightId: string,
    @Param('passengerId') passengerId: string,
  ) {
    const passenger = await this.passengersService.findOne(passengerId);
    if (!passenger)
      throw new HttpException('Passenger not found', HttpStatus.NOT_FOUND);

    return this.flightsService.addPassenger(flightId, passengerId);
  }
}
