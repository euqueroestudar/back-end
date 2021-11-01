import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { InstitutionService } from './institution.service';

@Module({
  providers: [InstitutionService, PrismaService],
})
export class InstitutionModule {}
