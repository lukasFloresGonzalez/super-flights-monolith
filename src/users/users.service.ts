import { Injectable } from '@nestjs/common';
import { UsersDto } from './dto/users.dto';
import { IUsers } from '../common/interface/users.interface';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { USER } from '../common/models/models';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(USER.name) private readonly model: Model<IUsers>) {}

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }
  async create(userDto: UsersDto): Promise<IUsers> {
    const hash = await this.hashPassword(userDto.password);
    const newUser = new this.model({ ...userDto, password: hash });
    return await newUser.save();
  }

  async findAll(): Promise<IUsers[]> {
    return await this.model.find();
  }

  async findOne(id: string): Promise<IUsers> {
    return await this.model.findById(id);
  }

  async update(id: string, userDto: UsersDto): Promise<IUsers> {
    const hash = await this.hashPassword(userDto.password);
    const user = { ...userDto, password: hash };
    return await this.model.findByIdAndUpdate(id, user, { new: true });
  }

  async delete(id: string): Promise<IUsers> {
    return await this.model.findByIdAndDelete(id);
  }
}
