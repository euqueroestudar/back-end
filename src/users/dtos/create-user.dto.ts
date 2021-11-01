import { Role } from '.prisma/client';
import { Exclude } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Match } from './match.decorator';

export enum typeAccount {
  INSTITUTION = 'INSTITUTION',
  PERSON = 'PERSON',
}

export class CreateUserDto {
  @MinLength(3)
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  password: string;

  @IsEnum(typeAccount)
  role: typeAccount;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @Match('password', {
    message: 'Passwords do not match',
  })
  passwordConfirm: string;
}
