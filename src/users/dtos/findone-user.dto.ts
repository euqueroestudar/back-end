import { Expose } from 'class-transformer';
import { IsEmail } from 'class-validator';

export class FindOneUserDto {
  @Expose()
  id: number;

  @Expose()
  username: string;

  @IsEmail()
  @Expose()
  email: string;
}
