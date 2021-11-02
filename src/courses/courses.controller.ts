import { Courses, Users } from '.prisma/client';
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
import { CoursesService } from './courses.service';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  async findAll(
    @Query('skip') skip: string,
    @Query('take') take: string,
  ): Promise<Courses[]> {
    return this.coursesService.findAll({
      skip: Number(skip) || undefined,
      take: Number(take) || undefined,
      orderBy: { id: 'asc' },
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.coursesService.findOne({ id: Number(id) });
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @CurrentUser() user: Users,
    @Param('id') id: string,
    @Body() data: any,
  ) {
    return await this.coursesService.update({
      where: { id: Number(id) },
      data,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @CurrentUser() user: Users,
    @Body()
    courseData: any,
  ): Promise<Courses> {
    return this.coursesService.create({
      ...courseData,
      published: true,
      author: {
        connect: {
          id: user.id,
        },
      },
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.coursesService.delete({ id: Number(id) });
  }
}
