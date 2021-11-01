import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { Match } from './match.decorator';

export class CreateAuthDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  password: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @Match('password', {
    message: 'Passwords do not match',
  })
  passwordConfirm: string;
}
