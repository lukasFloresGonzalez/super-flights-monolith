import { IPassengers } from './passengers.interface';

export interface IFlights extends Document {
  pilot: string;
  airplane: string;
  destinationCity: string;
  flightDate: string;
  passengers: IPassengers[];
}
