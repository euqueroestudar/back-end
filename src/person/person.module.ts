import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PersonController } from './person.controller';
import { PersonService } from './person.service';

@Module({
  controllers: [PersonController],
  providers: [PersonService, PrismaService],
})
export class PersonModule {}
