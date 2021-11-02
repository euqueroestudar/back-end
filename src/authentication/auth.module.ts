import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { AuthController } from './auth.controller';
import { UsersService } from '../users/users.service';
import { PrismaModule } from '../prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { PersonModule } from '../person/person.module';
import { InstitutionModule } from '../institution/institution.module';
import { CoursesModule } from 'src/courses/courses.module';
import { AddressModule } from 'src/address/address.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    PersonModule,
    InstitutionModule,
    PassportModule,
    CoursesModule,
    AddressModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '7d' },
    }),
    PrismaModule,
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, UsersService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
