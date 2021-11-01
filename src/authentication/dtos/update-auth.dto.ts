import { Role } from '.prisma/client';
import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class UpdateAuthDto {
  @Expose()
  @IsString()
  @MinLength(3)
  username: string;

  @Expose()
  @IsEmail()
  email: string;

  @Expose()
  role: Role;

  @Exclude({
    toPlainOnly: true,
    toClassOnly: true,
  })
  password: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
