import { Role } from '.prisma/client';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { Match } from './match.decorator';

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

  @IsString()
  role: Role;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @Match('password', {
    message: 'Passwords do not match',
  })
  passwordConfirm: string;
}
