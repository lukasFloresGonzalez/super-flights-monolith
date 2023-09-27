import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FLIGHT } from '../common/models/models';
import { Model } from 'mongoose';
import { IFlights } from '../common/interface/flights.interface';
import { FlightsDto } from './dto/flights.dto';

@Injectable()
export class FlightsService {
  constructor(
    @InjectModel(FLIGHT.name) private readonly model: Model<IFlights>,
  ) {}

  async create(flightDto: FlightsDto): Promise<IFlights> {
    const newFlight = new this.model(flightDto);
    return await newFlight.save();
  }

  async findAll(): Promise<IFlights[]> {
    return await this.model.find();
  }

  async findOne(id: string): Promise<IFlights> {
    return await this.model.findById(id);
  }

  async update(id: string, flightDto: FlightsDto): Promise<IFlights> {
    return await this.model.findByIdAndUpdate(id, flightDto, { new: true });
  }

  async delete(id: string) {
    await this.model.findByIdAndDelete(id);
    return {
      status: HttpStatus.OK,
      message: 'Flight deleted successfully',
    };
  }

  async addPassenger(flightId: string, passengerId: string): Promise<IFlights> {
    return await this.model
      .findByIdAndUpdate(
        flightId,
        {
          $addToSet: { passengers: passengerId },
        },
        { new: true },
      )
      .populate('passengers');
  }
}
