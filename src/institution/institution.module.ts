import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { InstitutionService } from './institution.service';
import { InstitutionController } from './institution.controller';

@Module({
  providers: [InstitutionService, PrismaService],
  controllers: [InstitutionController],
})
export class InstitutionModule {}
