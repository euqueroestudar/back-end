import { Module } from '@nestjs/common';
import { InstitutionService } from './institution.service';

@Module({
  providers: [InstitutionService]
})
export class InstitutionModule {}
