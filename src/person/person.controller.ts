import { Person, Users } from '.prisma/client';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/authentication/guards/jwt-auth.guard';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { CreatePersonDto } from './dtos/create-person';
import { PersonService } from './person.service';

@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.personService.findOne({ id: Number(id) });
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async editAccount(@CurrentUser() user: Users, @Body() data: any) {
    return await this.personService.update({
      where: { id: user.id },
      data,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @CurrentUser() user: Users,
    @Body()
    personData: CreatePersonDto,
  ): Promise<Person> {
    return this.personService.create({
      ...personData,
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
    return this.personService.delete({ id: Number(user.id) });
  }
}
