import { Expose } from 'class-transformer';
import { IsEmail } from 'class-validator';

export class FindOneUserDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @IsEmail()
  @Expose()
  email: string;
}
