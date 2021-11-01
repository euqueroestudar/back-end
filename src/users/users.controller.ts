import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma, Users as UsersModel } from '.prisma/client';
import { UserDto, CreateUserDto, UpdateUserDto, FindOneUserDto } from './dtos';
import { ApiTags } from '@nestjs/swagger';
import { Serialize } from '../interceptors/serialize.interceptor';
import { PrismaService } from 'src/prisma/prisma.service';

@ApiTags('Users')
@Serialize(UserDto)
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private repo: PrismaService,
  ) {}

  @Serialize(FindOneUserDto)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<FindOneUserDto> {
    return this.usersService.findOne({ id: Number(id) });
  }

  @Get()
  async findAll(
    @Query('skip') skip: string,
    @Query('take') take: string,
  ): Promise<UsersModel[]> {
    return this.usersService.findAll({
      skip: Number(skip) || undefined,
      take: Number(take) || undefined,
      orderBy: { id: 'asc' },
    });
  }

  @Post()
  async create(@Body() data: CreateUserDto) {
    return await this.usersService.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: UpdateUserDto) {
    const user = await this.usersService.findOne({
      id: Number(id),
    });

    if (!user.id) {
      throw new NotFoundException('user not found');
    }

    return this.usersService.update({
      where: { id: Number(id) },
      data: data,
    });
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<UsersModel> {
    return this.usersService.delete({ id: Number(id) });
  }
}
