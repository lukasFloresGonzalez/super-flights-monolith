import { HttpStatus, Injectable } from '@nestjs/common';
import { PASSENGER } from '../common/models/models';
import { IPassengers } from '../common/interface/passengers.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { PassengersDto } from './dto/passengers.dto';

@Injectable()
export class PassengersService {
  constructor(
    @InjectModel(PASSENGER.name) private readonly model: Model<IPassengers>,
  ) {}

  async create(passengerDto: PassengersDto): Promise<IPassengers> {
    const newPassenger = new this.model(passengerDto);
    return await newPassenger.save();
  }

  async findAll(): Promise<IPassengers[]> {
    return await this.model.find();
  }

  async findOne(id: string): Promise<IPassengers> {
    return await this.model.findById(id);
  }

  async update(id: string, passengerDto: PassengersDto): Promise<IPassengers> {
    return await this.model.findByIdAndUpdate(id, passengerDto, { new: true });
  }

  async delete(id: string) {
    await this.model.findByIdAndDelete(id);
    return {
      status: HttpStatus.OK,
      message: 'Deleted successfully',
    };
  }
}
