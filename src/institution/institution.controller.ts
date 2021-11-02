import { Institution, Users } from '.prisma/client';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/authentication/guards/jwt-auth.guard';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { InstitutionService } from './institution.service';

@Controller('institution')
export class InstitutionController {
  constructor(private readonly institutionService: InstitutionService) {}

  @Get()
  async findAll(
    @Query('skip') skip: string,
    @Query('take') take: string,
  ): Promise<Institution[]> {
    return this.institutionService.findAll({
      skip: Number(skip) || undefined,
      take: Number(take) || undefined,
      orderBy: { id: 'asc' },
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.institutionService.findOne({ id: Number(id) });
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async update(@CurrentUser() user: Users, @Body() data: any) {
    return await this.institutionService.update({
      where: { id: user.id },
      data,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @CurrentUser() user: Users,
    @Body()
    institutionData: any,
  ): Promise<Institution> {
    return this.institutionService.create({
      ...institutionData,
      user: {
        connect: {
          id: user.id,
        },
      },
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async delete(@CurrentUser() user: Users) {
    return this.institutionService.delete({ userId: Number(user.id) });
  }
}
