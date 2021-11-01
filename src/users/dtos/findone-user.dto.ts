import { Role } from '.prisma/client';
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

  @Expose()
  person: any;

  @Expose()
  role: Role;
}
