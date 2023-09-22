import { Module } from '@nestjs/common';
import { PassengersService } from './passengers.service';
import { PassengersController } from './passengers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PASSENGER } from '../common/models/models';
import { PassengerSchema } from './schema/passengers.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: PASSENGER.name,
        useFactory: () => PassengerSchema,
      },
    ]),
  ],
  providers: [PassengersService],
  controllers: [PassengersController],
})
export class PassengersModule {}
