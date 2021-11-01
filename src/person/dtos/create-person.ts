import { Type } from 'class-transformer';
import {
  IsDate,
  IsDateString,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';
import { Timestamp } from 'rxjs';

export class CreatePersonDto {
  @IsOptional()
  id: string;

  @MinLength(3)
  @IsString()
  name: string;

  @MinLength(3)
  @IsString()
  lastname: string;

  @MinLength(3)
  @IsString()
  scholarity: string;

  @IsPhoneNumber()
  phone: string;

  @Type(() => Date)
  @IsDate()
  birthdate: Date;
  createdAt: Date;
  updatedAt: Date;
}
