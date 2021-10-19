import { Expose } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';

export class UserDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @IsEmail()
  @Expose()
  email: string;

  @IsString()
  @Expose()
  role: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
