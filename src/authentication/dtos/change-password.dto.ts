import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { Role } from 'src/config/roles/roles.enum';
import { Match } from './match.decorator';

export class ChangePasswordAuthDto {
  @Expose()
  id: number;

  @Expose()
  username: string;

  @Expose()
  email: string;

  @Expose()
  role: Role;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  oldPassword: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  newPassword: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @Match('newPassword', {
    message: 'Passwords do not match',
  })
  passwordConfirm: string;

  @Expose({
    toPlainOnly: true,
  })
  password: string;
}
