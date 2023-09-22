import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PassengersDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsNumber()
  readonly phone: number;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly address: string;
}
