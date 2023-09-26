import { Module } from '@nestjs/common';
import { FlightsService } from './flights.service';
import { FlightsController } from './flights.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FLIGHT } from '../common/models/models';
import { FlightSchema } from './schema/flights.schema';
import { PassengersModule } from '../passengers/passengers.module';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: FLIGHT.name,
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        useFactory: () => FlightSchema.plugin(require('mongoose-autopopulate')),
      },
    ]),
    PassengersModule,
  ],
  providers: [FlightsService],
  controllers: [FlightsController],
})
export class FlightsModule {}
